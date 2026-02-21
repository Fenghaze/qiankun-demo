// 主应用中初始化全局状态
import { initGlobalState } from "qiankun";
import { userInfoStore } from "./stores/userInfo";
const actions = initGlobalState({});
async function getUserInfo() {
  let userInfo: object = {};
  userInfo = {
    user: `user0`,
    userId: `001`,
    theme: Number(window.localStorage.getItem('theme') || 0),
  };
  return userInfo;
}

async function getAccessToken() {
  console.log("用户登录成功，获取登录信息...");
  setTimeout(async () => {
    // 发布状态
    const data = await getUserInfo();
    const userInfo = userInfoStore();
    userInfo.setUserInfo(data);
    actions.setGlobalState(data);
  }, 1000);
}

getAccessToken();
