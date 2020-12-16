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
