## vue-router
- 安装

npm i vue-router
vue add @vue/router 
底层依赖的是 path-to-regexp库


- 使用
```js
import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../pages/Home.vue";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    {
        path: "/home",
        redirect: "/",
    },
  ]
})

export default router;

// 然后在入口文件引入
import router from "./router";
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

//app组件需要给出口去渲染
<router-view></router-view>
```

```js
// 由于组件复用的原因，路由变化，并不会引起created方法再次触发


// 观察路由的变化
watch: {
    $route() {
        console.log(this.$route);
        console.log("重新去请求数据");
    },
},
// 有下面这个方法，上边的watch就监听不到了
beforeRouteUpdate() {
    console.log("重新去请求数据 - beforeRouteUpdate");
},


```


```js
const router = new VueRouter({
  mode: "history",
//   router先匹配到谁就展示谁
  routes: [
    {
      path: "/home",
      component: {

      },
    },
  ]
})


```

###　$route对象　路由传参
- 在组件中可以使用(this.$route)这个对象，包含了路由的信息，
> 在组件的template标签里直接用$route

尽量不要在通用组件使用$route，（会限制其灵活性）通用的组件会被其他组件使用，如果在通用组件中使用$route，而引用通用组件的父组件也就需要依赖router，会引起问题

```js
// 解决方式
// 在路由中定义
routes: [
    {
      path: "/home/:id",
      redirect: "/",
    //   解决组件组合router的问题
    //   props:true，
    props: (route) => {
        console.log(route);
        // -》 id
        // 给它加工加工
        return {
          id: route.params.id + "------------",
        };
      },
    },
  ]
// 在组件中使用

props: ["id"],
// template 中使用id即可
```

### 嵌套路由

```js
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/user",
    //   在这个组件内部需要写出口 <router-view></router-view>
      component:User,
      children:[
          {
              path:"posts",
              component:Posts,
              children:[
                //   ...
              ]
          },
          {
              path:"foo",
              component:Foo
          },
      ]

    },
  ]
})


```


### router-view 命名视图（命名路由）是兄弟关系

```js
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/user",
    //   在这个组件内部需要写出口 <router-view></router-view>
    //   component:User,
      components:{
        //    <router-view></router-view>
          default:User,
          //    <router-view name ="foo"></router-view>
          foo:Foo
      },
      children:[
          {
              path:"posts",
              component:Posts,
              children:[
                //   ...
              ]
          },
          {
              path:"foo",
              component:Foo
          },
      ]

    },
  ]
})

// 在父组件使用：
<router-view></router-view>
<router-view name = "foo"></router-view>
<router-view name = "class"></router-view>


```

### 重定向与别名
> 重定向路径会跳转，访问别名不跳转

```js
routes: [
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      alias:"/heihei",
      component:Home
    },

```


###　跳转

<router-link to = "" ></router-link>

```js
routes: [
    {
        name:"homePage",
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      alias:"/heihei",
      component:Home
    },


<router-link to = "/home" ></router-link>
<router-link :to = "{name:'homePage',params:{id:2}}" ></router-link>
```

#### 编程式导航

```js
<button @click = "toUser">to user</button>  

methods:{
    toUser(){
        // this.$router
        this.$router.push({
            name:"user"

        })
        // this.$router.go(-1)
        // this.$router.back()

        //跳转到user,并把调用栈里刚才的数据替换成user，你在点击go（-1）效果和push不同了就
        this.$router.replace({
            name:"user"
        })

    }
}


```



## 组件通信

- 父子组件通信

1. props $emit(最推荐使用的)
> 单纯的输入和输出

2. $refs

```js
// 父组件获取子组件
// 在父组件上定义ref
<Bar ref = "bar"></Bar>
// 获取组件实例
this.$refs
// 调用子组件上的方法
this.$refs.bar.setTitle("new title")


//  ref写在原声dom上,this.$refs里边获取的就是原声的dom对象
<div ref = "div"></div> 
```




3. $children $parent

```js
// 在父组件上调用
this.$children

// 在子组件上
// 子组件获取父组件
this.$parent
```

- > 优缺点：

  - this.$children,子组件的顺序不固定，获取不准确（强耦合）
    > 尽量少用，在开发组件库，固定的用法可以这么用

  - this.$parent ，换了一个父级组件，调用的方法没有则会报错  （强耦合）


- > $children  $parent  $refs 都是直接操作了dom对象，是mvvm不推荐的,数据驱动视图



- 多层级父子组件通信

1. 依赖注入 provide/inject(组件库中的使用较多，业务上少)
> 子组件占据主动性，什么时候调用子组件决定

```js
// 场景 组件a包含组件b,组件b包含组件c，组件a向组件c通信

// 在a组件中
provide:{
  foo:"foo"
}

// 在c组件中
inject:["foo"]
// 就可以直接使用foo了


// provide也可以写成一个函数
provide(){
  return {
    foo:"foo",
    compa:this
  }
}
inject:["foo","compa"]
// this.compa可以获取到父（上级）组件，如果b组件也写了provide,则会覆盖a组件同名的

```
2. （1）$attrs
> 如果传入的值没有在props里，则会在$attrs里（可以减少在props里的声明,但还是得经过中间层（中间组件））
> 传递的层级过多，很麻烦

```js
<Baz :title = "$attrs.title"></Baz>

// 应用，更像一个原声的组件，便于使用（在使用Button组件时，写一些button通过属性可以起到作用）
<Button disabled></Button>
<button  :disabled = "$attrs.disabled"></button>


// 当父组件传入一个值的时候，子组件没有这个props，则这个属性会被添加到子组件的根组件上
// 如何解决，一般会和$attrs联合使用
inheritAttrs: false,

```

2. （2）$listeners
> 传入的事件都在这个里边

```js

<Bar @a = "" @b =""></Bar>

// Bar组件内去调用
this.$listeners.a

```
  - 传入的值可以从 $attrs $listeners props里边找到



- 非关系组件通信

```js
// mounted生命周期内，子组件已全部挂在完成
// eventBus 过于灵活，大型项目里不容易维护，变得混乱，事件过多。名字也可能重复，
// $on $off $emit $once 在vue3里被干掉，推荐使用 mitt第三方库

export let bus = new Vue()


import {bus} from "./bus.js"
//on在前，触发在后，还没有监听就触发，不会起到作用
bus.$on("to-compa",(val)=>{
  console.log(val)
})

bus.$emit("to-compa","我是参数")

```

  - 父子组件通信推荐props $emit
  - 父孙组件通信可以使用依赖注入（更试用在组件库中的项目里），更多的是用event bus，再大型的项目用vuex


### vuex

- 通信是为了改变组件内部的状态，对应的就是vuex里的状态管理

```js
import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
  }
})
export default store



import store from "store/index.js"
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");


// 全局的 在组件内可以用this.$store获取数据
this.$store.state
// 1.在组件内可以使用 this.$store.state.值 展示页面
// 2.在组件页面页面中直接使用变量该这么显示 {{username }}
//    当在data里写入 username :this.$store.state.username,是不行的，与store state脱离关系了，只是一个值
//    在计算属性里写 computed:{username (){return this.$store.state.username}}

// 修改状态
// 如果在组件内直接通过this.$store.user.name = "111",当有很多个组件都用同样的方法去修改name的值，出现了bug并不容易找到问题所在
// 用一个函数去包装 去修改，加个断点就很容易找到。vuex也是这么做的，通过 mutations

// 如何调用 mutations，提供了一个方法commit
// 在commit里收集信息

// changeUsername mutations 的成员参数
this.$store.commit("changeUsername",{
  name:"xiaohong"
})

mutations:{
  // 这里面不能出现异步,因为没法记录，所有的异步操作需要写在action里
  changeUsername(state,payload){
    // state是全局的状态
    // payload是传递的数据
    state.user.name = payload.name 
  }
}

```


2. getters 相当于全局的计算属性，将公共的代码写在这个里边

获取的时候需要this.$store.getters.xxx



3. mapState mapGetters

```js
computed:{
  ...mapState(['user']),
  ...mapGetters(['tenYearsOld'])
}

```



4. action 专门处理异步的，异步操作先进action,在commit

```js


```