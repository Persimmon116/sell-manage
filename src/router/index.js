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

const routes = [
  {
    path: '/',
    redirect: "/home"//重定向
  },
  {
    // 404
    path: '/404',
    component: Err404
  },
  {
    // 登陆模块
    path: '/login',
    component: Login
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: "/home",//重定向
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
    meta: { title: '订单管理' },
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
    meta: { title: '商品管理' },
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
        meta: { title: '商品添加' }

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
    meta: { title: '店铺管理' },
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
    meta: { title: '账号管理' },
    children: [
      {
        // 账号列表
        path: '/accountmanage/account-list',
        component: () => import('@/views/AccountManage/AccountList.vue'),
        meta: { title: '账号列表' },
      },
      {
        // 账号添加
        path: '/accountmanage/account-add',
        component: () => import('@/views/AccountManage/AddAccount.vue'),
        meta: { title: '账号添加' },
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
    meta: { title: '销售统计' },
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
    hidden: true
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


export default router
