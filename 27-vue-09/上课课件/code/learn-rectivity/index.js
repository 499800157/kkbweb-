// const { ref, reactive, effect } = require("@vue/reactivity");
import {
  ref,
  reactive,
  effect,
} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

// 收集依赖 和 触发依赖的过程？

// const a = ref(10);

// let b;
// // view -> 响应式数据

// // watchEffect
// effect(() => {
//   b = a.value + 10;
//   console.log(b);
// });

// a.value = 20;

// reutrn {} -> setup  -> temaplte

// vue3 的更新机制 -> 最小模型
// vue3 -> mini
const App = {
  // template -> render
  render(context) {
    // 构建 view
    // b
    effect(() => {
      document.querySelector("#app").innerHTML = ``;
      // diff -> vDom
      const div = document.createElement("div");
      // 响应式数据 get set 
      div.innerText = context.count.value;
      // 添加到
      document.querySelector("#app").append(div);
    });
  },

  setup() {
    window.count = ref(0);
    // count -> change
    return {
      count,
    };
  },
};

App.render(App.setup());
