import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 重置样式
import '@/assets/css/reset.css'
// 登陆模块
import Login from '@/views/Login.vue'
// 布局模块
import Layout from '@/views/layout/Layout.vue'

const routes = [
  {
    path: '/',
    redirect: "/home"//重定向
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
        meta: { title: '首页' }
      },
    ]

  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    children: [
      {
        // 订单管理
        path: '/order/order-manage',
        component: () => import('@/views/OrderManage/OrderManage.vue')//路由懒加载
      },
      {
        // 订单详情
        path: '/order/order-details',
        component: () => import('@/views/OrderManage/OrderDetails.vue')
      },
    ]

  },

  // 商品管理
  {
    path: '/goodsmanage',
    component: Layout,
    children: [
      {
        // 商品列表
        path: '/goodsmanage/goods-list',
        component: () => import('@/views/GoodsManage/GoodsList.vue')
      },
      {
        // 商品添加
        path: '/goodsmanage/goods-add',
        component: () => import('@/views/GoodsManage/GoodsAdd.vue')
      },
      {
        // 商品分类
        path: '/goodsmanage/goods-sort',
        component: () => import('@/views/GoodsManage/GoodSort.vue')
      },
    ]

  },

  // 店铺管理
  {
    path: '/shopmanage',
    component: Layout,
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
    children: [
      {
        // 账号列表
        path: '/accountmanage/account-list',
        component: () => import('@/views/AccountManage/AccountList.vue')
      },
      {
        // 账号添加
        path: '/accountmanage/account-add',
        component: () => import('@/views/AccountManage/AddAccount.vue')
      },
      {
        // 修改密码
        path: '/accountmanage/modify-pwd',
        component: () => import('@/views/AccountManage/ModifyPwd.vue')
      },
      {
        // 个人中心
        path: '/accountmanage/personal',
        component: () => import('@/views/AccountManage/Personal.vue')
      },
    ]

  },
  // 销售统计
  {
    path: '/accountmanage',
    component: Layout,
    // redirect: "/SaleStatistics/account-list",//重定向
    children: [
      {
        // 商品统计
        path: '/salestatistics/goods-statistics',
        component: () => import('@/views/SaleStatistics/GoodStatistics.vue')
      },
      {
        // 订单统计
        path: '/salestatistics/order-statistics',
        component: () => import('@/views/SaleStatistics/OrderStatistics.vue')
      },
    ]

  },
]

const router = new VueRouter({
  routes
})

export default router
