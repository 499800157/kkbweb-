console.log("a.js");
let a = 10;
let b = 20;
let c = 30;
// 导出；(只能导出一个)；
// export default a;
export {a as default}
// export  default b;
//export 导出多个；
export {b};
export {c};
