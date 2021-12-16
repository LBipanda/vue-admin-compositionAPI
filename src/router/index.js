import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import Layout from '@/views/Layout/index'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/**
 * 1、系统分配
 * 2、角色分配
 * 3、按钮级别分配
 *
 * 工作：路由是前台配，还是后台配的问题？
 * 
 * 个人建议，前端配置，这样才能达到前后端分离的工作；
 * 
 * 1、后台配置路由，前端人不在的情况；没办法页面跳转；
 * 2、新的需求，前端把路由配好了，后台的人不在，没办法找到路由；
 * 
 */

/**
 * 
 * 1、默认路由
 * 2、动态路由
 */
const routes = [
];

/**
 * 默认路由
 */
export const defaultRouterMap = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    meta:{
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/login/index.vue"),
    meta:{
      name: '登录'
    }
  },
  {
    path: "/console",
    name: "console",
    redirect: '/index',
    component: Layout,
    meta:{
      name: '控制台',
      icon: 'console'
    },
    children:[
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/Console/index.vue"),
        meta:{
          name: '首页'
        }
      }
    ]
  },
  
]

/**
 * 动态路由
 * 角色：sale, technician, manager
 */
export const asyncRouterMap = [
  {
    path: "/info",
    name: "info",
    component: Layout,
    meta:{
      role: ['sale', 'manager'],
      system: 'infoSystem',
      name: '信息管理',
      icon: 'info'
    },
    children:[
      {
        path: "/infoIndex",
        name: "infoIndex",
        component: () => import("@/views/info/index.vue"),
        meta:{
          name: '信息列表'
        },
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        component: () => import("@/views/info/category.vue"),
        meta:{
          name: '信息分类'
        },
      },
      {
        path: "/infoCategoryDetail/:id/:title",
        name: "infoCategoryDetail",
        hidden: true,
        component: () => import("@/views/info/categoryDetail.vue"),
        meta:{
          name: '信息详情'
        },
      },
    ]
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta:{
      role: ['sale'],
      system: 'userSystem', // 自定义key
      name: '用户管理',
      icon: 'user'
    },
    children:[
      {
        path: "/userList",
        name: "userList",
        component: () => import("@/views/user/userList.vue"),
        meta:{
          name: '用户列表'
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes: defaultRouterMap
});

export default router;
