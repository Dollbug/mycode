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
