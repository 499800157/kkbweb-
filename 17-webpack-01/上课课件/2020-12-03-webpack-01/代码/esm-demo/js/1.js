// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
// import 语法一定要写在模块顶层作用域 - 静态导入



fn1();

// import {fn1 as m2Fn1} from './2.js';
// m2Fn1();

document.onclick = async function() {
    // import 语句不能写在局部作用域
    // import {fn1 as m2Fn1} from './2.js';
    // m2Fn1();

    // 需要使用按需import，则需要使用js内置的一个方法（不是语法）
    // let m2 = await import('./2.js');
    // m2.fn1();

    // let m2 = import('./2.js');
    // m2.fn1();
}

function fn1() {
    console.log('我是1.js的fn1函数');
}

// x = 100;

// console.log('x', x);