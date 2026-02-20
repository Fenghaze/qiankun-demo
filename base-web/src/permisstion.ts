// 主应用中初始化全局状态
import { initGlobalState } from "qiankun";

const actions = initGlobalState({
  user: "", // 初始状态
  userId: "",
});

async function getAccessToken() {
  console.log("用户登录成功，获取登录信息...");
  setTimeout(() => {
    // 发布状态
    actions.setGlobalState({
      user: `user0`,
      userId: `001`,
    });
  }, 1000);
}

getAccessToken();
