// 通用库

// amd
// define(function() {
//     function fn1() {
//         console.log('fn1');
//     }

//     return {fn1};
// }) 



// commonjs
// function fn1() {
//     console.log('fn1');
// }

// module.exports.fn1 = fn1;



M(function() {
    function fn1() {
        console.log('fn1');
    }

    return {fn1};
});

function M(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // Node, CommonJS-like
        module.exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
      	// AMD 模块环境下
        define(factory);
    }
}