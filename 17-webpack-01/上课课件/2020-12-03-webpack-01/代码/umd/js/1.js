define(['./js/2.js'], function(m2) {

    // console.log('m2', m2);

    fn1();

    m2.fn1();

    function fn1() {
        console.log('我是1.js的fn1函数');
    }
})
