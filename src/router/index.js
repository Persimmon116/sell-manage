import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复跳转到自己警告让人难受的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter)

// 重置样式
import '@/assets/css/reset.css'
// 登陆模块
import Login from '@/views/Login.vue'
// 布局模块
import Layout from '@/views/layout/Layout.vue'
import Err404 from '@/views/404.vue'

// 本地存储
import local from '@/utils/local'
import { locale } from 'core-js';

const routes = [
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: "/home",//重定向
    meta: { title: '后台首页' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/Home.vue'),//路由懒加载
      },
    ]

  },
  // 登陆模块
  {
    path: '/login',
    component: Login
  },
]

// 动态路由
const asyncRouter = [
  // {
  //   path: '/',
  //   redirect: "/home"//重定向
  // },
  {
    // 404
    path: '/404',
    component: Err404,
    hidden: false,
  },
  // 登陆模块
  {
    path: '/login',
    hidden: false,
    component: Login
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: "/home",//重定向
    hidden: true,
    meta: { title: '后台首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/Home.vue'),//路由懒加载
      },
    ]

  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-manage',
    hidden: true,
    meta: { title: '订单管理', icon: 'el-icon-document' },
    children: [
      {
        // 订单管理
        path: '/order/order-manage',
        component: () => import('@/views/OrderManage/OrderManage.vue'),//路由懒加载
        meta: { title: '订单管理' }
      },
      {
        // 订单修改
        path: '/order/order-edit',
        component: () => import('@/views/OrderManage/OrderEdit.vue'),
        meta: { title: '订单详情' }

      },
    ]

  },

  // 商品管理
  {
    path: '/goodsmanage',
    component: Layout,
    redirect: '/goodsmanage/goods-list',
    hidden: true,
    meta: { title: '商品管理', icon: 'el-icon-shopping-bag-2', role: ['super', 'normal'] },
    children: [
      {
        // 商品列表
        path: '/goodsmanage/goods-list',
        component: () => import('@/views/GoodsManage/GoodsList.vue'),
        meta: { title: '商品列表' }
      },
      {
        // 商品添加
        path: '/goodsmanage/goods-add',
        component: () => import('@/views/GoodsManage/GoodsAdd.vue'),
        meta: { title: '商品添加', role: ['super'] }

      },
      {
        // 商品分类
        path: '/goodsmanage/goods-sort',
        component: () => import('@/views/GoodsManage/GoodSort.vue'),
        meta: { title: '商品分类' }

      },
    ]

  },

  // 店铺管理
  {
    path: '/shopmanage',
    component: Layout,
    hidden: true,
    meta: { title: '店铺管理', icon: 'el-icon-s-shop', role: ['super'] },
    children: [
      {
        path: '',
        component: () => import('@/views/ShopManage.vue')//路由懒加载
      },
    ]

  },
  // 账号管理
  {
    path: '/accountmanage',
    component: Layout,
    redirect: '/accountmanage/account-list',
    hidden: true,
    meta: { title: '账号管理', icon: 'el-icon-user-solid', role: ["super", "normal"], },
    children: [
      {
        // 账号列表
        path: '/accountmanage/account-list',
        component: () => import('@/views/AccountManage/AccountList.vue'),
        meta: { title: '账号列表', role: ['super'] },
      },
      {
        // 账号添加
        path: '/accountmanage/account-add',
        component: () => import('@/views/AccountManage/AddAccount.vue'),
        meta: { title: '账号添加', role: ['super'] },
      },
      {
        // 修改密码
        path: '/accountmanage/modify-pwd',
        component: () => import('@/views/AccountManage/ModifyPwd.vue'),
        meta: { title: '修改密码' },
      },
      {
        // 个人中心
        path: '/accountmanage/personal',
        component: () => import('@/views/AccountManage/Personal.vue'),
        meta: { title: '个人中心' },
      },
    ]

  },
  // 销售统计
  {
    path: '/saleStatistics',
    component: Layout,
    redirect: "/salestatistics/goods-tatistics",//重定向
    hidden: true,
    meta: { title: '销售统计', icon: 'el-icon-s-data', role: ['super'] },
    children: [
      {
        // 商品统计
        path: '/salestatistics/goods-tatistics',
        component: () => import('@/views/SaleStatistics/GoodStatistics.vue'),
        meta: { title: '商品统计' },
      },
      {
        // 订单统计
        path: '/salestatistics/order-statistics',
        component: () => import('@/views/SaleStatistics/OrderStatistics.vue'),
        meta: { title: '订单统计' },
      },
    ]

  },
  {
    path: '*', // 页面不存在的情况下会跳到404页面
    redirect: '/404',
    name: 'notFound',
    hidden: false
  }
]

const router = new VueRouter({
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /* 
    to: 你要去哪栋？ 【你要去的目标路由对象】
    from: 你从哪里来啊？ 【你离开的路由对象】
    next： 走吧 放行 【是个函数】
  */

  // 判断是否登录
  let isLogin = local.get("token") ? true : false;

  if (isLogin) {
    next(); // 如果登录过 直接放行
  } else {
    // 如果去的是登录
    if (to.path === "/login") {
      next(); // 放行
    } else {
      next({ path: "/login" }); // 否则 去的就是别的页面 重置到登录
    }
  }
});

// 判断当前对象是否有权限
function isPower(router, role) {
  // 如果当前对象有meta且有role
  if (router.meta && router.meta.role) {
    // 返回当前对象的role中包含当前用户角色的路由
    return router.meta.role.includes(role)
  } else {
    return true
  }
  // console.log(router.meta);
}

// 计算有权限访问的路由
function calcRouter(asyncRouter, role) {
  // console.log(asyncRouter);
  // 定义变量保存结果             过滤出符合条件的路由
  let accessRouter = asyncRouter.filter(router => {
    // 调用师傅有权限函数 如果有权限 
    if (isPower(router, role)) {
      // console.log(router, role);
      // 如果当前对象有儿子且有长度
      if (router.children && router.children.length) {
        // 给当前对象的儿子重写，调用计算权限函数   传入当前对象儿子，及当前用户角色
        router.children = calcRouter(router.children, role)
      }
      // 返回当前
      return true
    } else {
      // 返回false
      return false
    }
  })
  // 返回结果
  return accessRouter
}

// 判断是否在左侧菜单显示
function isHidden(router, role) {
  // 如果当前对象有hidden且hidden为true
  if (router.hidden) {
    // 返回true
    return true
    // 否则
  } else {
    // 返回false
    return false
  }
}

// 计算动态菜单
function calcNav(accessRouter, role) {
  //定义变量保存 满足过滤条件的对象
  let arr = accessRouter.filter(router => {
    // 调用是否显示函数  满足条件则
    if (isHidden(router, role)) {
      // 返回true
      return true
    } else {
      // 返回false
      return false
    }
  })
  // console.log(arr);
  // 返回结果
  return arr
}

// 创建你当前角色能访问的路由
export function createRouter() {
  // 从本地存储拿值
  let role = local.get('role')
  // console.log(role);
  // 计算有权限访问的路由       传入动态路由和用户角色
  let accessRouter = calcRouter(asyncRouter, role)
  // console.log(accessRouter);
  // 将符合条件的路由动态添加
  router.addRoutes(accessRouter);

  // 计算动态菜单   传入符合条件的路由和当前用户角色
  let nav = calcNav(accessRouter, role)
  // console.log(nav);
  // 将计算结果放入本地存储
  local.set('nav', nav)
}
// 调用函数
createRouter()
export default router
