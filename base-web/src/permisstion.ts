// 主应用中初始化全局状态
import { initGlobalState } from "qiankun";

const actions = initGlobalState({
  user: "", // 初始状态
  token: "",
});

// 监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log("主应用状态变化", state, prev);
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
