// vue 路由学习笔记


// 使用 vue-router

import Vue from 'vue' //引入vue
import Router from 'vue-router'//引入vue-router
import MyConponent from '@/components/MyConponent' //引入组建

Vue.use(Router) //在全局使用 Router

export default new Router({
    routes:[                        //路由配置在数组里
        {                           //每个路由链接是一个对象
            path:'/',               //链接路径，这里表示首页
            name: 'MyConponent',    //路由名称
            component: MyConponent  //改路由渲染的组建模版
        }
    ]
})


// 此时 在页面输入http://localhost:8080/ ，即可渲染组件MyConponent里的内容



/**
 * 增加一个Hi的路由和页面， 即当地址栏输入 http: //localhost:8080/hi  的时候，渲染出Hi组件
 * 用户层面表现为渲染里另一个页面
 */

//  新建 Hi.vue 文件，如下
<template>
<div class="hello">
    <h1>{{msg}}</h1>
</div>
</template>

<script>
    export default{
        name:'hi',
        data(){
            return {
                msg:'Hi,I am cxf '
            }
        }
    }
</script>

<style scoped>

</style>


// 在 router/index.js 文件上引入Hi组件
import Hi from '@/components/Hi'


// 在 router/index.js 文件的 routes[] 数组中增加 下面对象
{
    path:'/hi',
    name:'Hi',
    component:Hi
}




/**
 * 至此，完整路由代码
 */

import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import MyConponent from '@/components/MyConponent' //引入根目录下的MyConponent.vue组件
import Hi from '@/components/Hi'

Vue.use(Router)  //Vue全局使用Router

export default new Router({
    routes: [              //配置路由，这里是个数组
        {                    //每一个链接都是一个对象
            path: '/',         //链接路径
            name: 'MyConponent', //路由名称，
            component: MyConponent //对应的组件模板
        }, {
            path: '/hi',
            name: 'Hi',
            component: Hi
        }
    ]
})





/**
 * 页面tab导航栏
 */

<router-link to="/" >首页</router-link>
<router-link to="/hi" >个人中心</router-link>

/**
 * to：写导航路径，是router/index.js 文件里边配置的path值，如果默认首页，要写成 to="/"
 */





// 关于vue子路由配置
// Hi1 && Hi2 都是 Hi 页面内的子路由

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        }, {
            path: '/hi',
            component: Hi,
            children: [
                { path: '/', component: Hi },
                { path: 'hi1', component: Hi1 },
                { path: 'hi2', component: Hi2 },
            ]
        }
    ]
})






 /**
  * vue-router 传递参数
  */

//   一、name 传递参数
// 1、路由文件 src/router/index.js配置name属性
routes:[
    {
        path:'/',
        name:'Hello',
        component:Hello
    }
]

// 2、在模板里 用 $router.name 接收，例如
<p>{{$route.name}}</p>



// 二、通过<router-link to=''></router-link> 中的to传参
// 1、写法
<router-link :to="{name:XXX,params:{key:value}}">valueString</router-link>
// 注意： to 是带冒号的
// name ：路由配置中的name值
//  params：要传的参数，对象形式，可以传多个值
// 例子如下
<router-link :to="{name:'hi1',params:{uername:'cxf'}"></router-link>//路由标签写法
// 路由配置
{path:'hi1',name:'hi1',component:Hi1}
// 模板内接收参数
{{$route.params.username}}



// 三、利用url传递参数
// 1、以冒号形式配置路由
{
    path:'params/:newsId/:newsTitle',
    component:Params
}

// 2、建立 params.vue 组件，拿到 url 传递的 newsId && newsTitle
<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId }}</p>
        <p>新闻标题：{{ $route.params.newsTitle }}</p>
    </div>
</template>

    <script>
        export default {
            name: 'params',
  data () {
    return {
            msg: 'params page'
      }
    }
  }
</script>


// 3、 在App.vue 文件里加入 <router-view></router-view> 标签，就可以使用url传值了
<router-link to="/params/101/小黑不黑">利用URL传值</router-link>






/**
 * 单页面多路由区域操作
 * 原则：一个组件渲染，一个 <router-view></router-view> 标签
 * <router-view name="myComponent"> </router-view> 通过name来决定渲染哪一个组件模板
 */

// 例如在app.vue 内，有三个 <router-view></router-view> 标签，三个标签内分别渲染不同的组件模版
    <router-view ></router-view>
    <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
    <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>

// 则，对应路由配置需要如下：
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            components: {
                default: Hello,
                left: Hi1,
                right: Hi2
            }
        }

    ]
})


/**
 * 重定向
 * 在路由配置文件中（ /src/router/index.js） 把原来的component换成redirect参数,例如：
 */
export default new Router({
    routes: [
        {
            path: '/',
            component: Hello
        }, {
            path: '/params/:newsId(\\d+)/:newsTitle',
            component: Params
        }, {
            path: '/goback',
            redirect: '/params/:newsId(\\d+)/:newsTitle'
        }

    ]
})

// 这里设置了 /goback  路由，但是并没有设置 component 参数，而是把component 参数变成了 redirect ，redirect参数的值是需要重定向到那个路由的path值



/**
 * 404页面(用户输错页面路径，需要统一给用户展示一个美观的404页面)
 */
{
    path:"*",
    component:Error
}
// path:’*’ 就是找不到页面时的配置，component 是 组件，Error就是 Error.vue 文件模板



/**
 * 路由钩子函数 2种，一是写在路由配置文件，二是写在模板里
 */

//  路由配置中的钩子函数 beforeEnter
{
    path: '/params/:newsId(\\d+)/:newsTitle',
    component: Params,
    beforeEnter: (to, from, next) => {
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
    }
}

// 路由配置里只有beforeEnter 函数



// 写在模板中的钩子函数
// beforeRouteEnter:在路由进入前的钩子函数
// beforeRouteLeave:在路由离开前的钩子函数
<script >
export default {
    name: 'params',
    data() {
        return {
            msg: 'params page'
        }
    },
    beforeRouteEnter: (to, from, next) => {
        console.log("准备进入路由模板");
        next();
    },
    beforeRouteLeave: (to, from, next) => {
        console.log("准备离开路由模板");
        next();
    }
}
</script>