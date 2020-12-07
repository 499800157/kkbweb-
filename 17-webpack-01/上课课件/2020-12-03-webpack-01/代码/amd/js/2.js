define(function() {
    function fn1() {
        console.log('fn1');
    }

    return {fn1}; // 等同于 module.exports.fn1 = fn1
})  
//module.exports = {a: 1}