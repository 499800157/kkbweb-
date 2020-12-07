import fn from './fn.js';
import './css/css.css';

// fn();

document.onclick = fn;


if (module.hot) {//如果开启 HMR
    console.log('module.hot', module.hot);

    // 当 ./fn.js 这个模板更新的时候，执行对应函数
    module.hot.accept('./fn.js', function() {
      // 更新逻辑
      document.onclick = fn;
    })
}