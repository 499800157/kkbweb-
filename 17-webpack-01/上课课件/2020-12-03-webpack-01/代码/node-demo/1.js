let m2 = require('./2.js'); //m2 => 2.js module.exports
let mkkb = require('./kkb');
let mkkb2 = require('kkb');

// module => node 中的默认内置对象，每一个文件都会有一个独立的module对象，这个对象代表当前模块（信息）
console.log('module', module);

module.exports.a = 100;

console.log('m2', m2);

console.log('mkkb', mkkb);
console.log('mkkb2', mkkb2);