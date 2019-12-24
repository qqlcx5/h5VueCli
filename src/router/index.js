/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/Index';

Vue.use(Router);

/**
 * @for meta
 * @param title 标题
 * @param icon 图标
 * @param name 用来匹配路由名称
 */

const constantRouter = [
  // 首页
  {
    path: '/',
    redirect: '/',
    component: Layout,
    meta: { title: 'stable' },
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index'),
        meta: { title: 'stable' },
      },
      {
        path: '/snatch',
        name: 'snatch',
        component: () => import(/* webpackChunkName: "index" */ '../views/snatch/Index.vue'),
        meta: { title: 'stable' },
      },
      {
        path: '/usn',
        name: 'usn',
        component: () => import(/* webpackChunkName: "index" */ '../views/usn/Index.vue'),
        meta: { title: 'stable' },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "index" */ '../views/my/Index.vue'),
        meta: { title: 'stable' },
      },
    ]
  },
  // USN
  {
    path: '/usn',
    redirect: '/usn',
    component: Layout,
    meta: { title: 'otc' },
    children: [
      { // usn首页
        path: '/',
        name: 'usn',
        component: () => import(/* webpackChunkName: "usn" */ '@/views/usn/Index'),
        meta: { title: 'otc' },
      },
      { // usn 操作首页
        path: 'action',
        name: 'actionForUsn',
        component: () => import(/* webpackChunkName: "usn" */ '@/views/usn/childView/ActionForUsn'),
        meta: { title: 'otc', noTabbar: true, keepAlive: true },
      },
      { // usn 已还详情
        path: 'repay-detail',
        name: 'repayDetail',
        component: () => import(/* webpackChunkName: "usn" */ '../views/usn/childView/RepayDetail.vue'),
        meta: { title: 'otc', noTabbar: true },
      },
      { // usn 价格指数
        path: 'price-index',
        name: 'priceIndex',
        component: () => import(/* webpackChunkName: "usn" */ '../views/usn/childView/PriceIndex.vue'),
        meta: { title: 'otc', noTabbar: true },
      },
      { // usn 偿还订单
        path: 'repay-bill',
        name: 'repayBill',
        component: () => import(/* webpackChunkName: "usn" */ '../views/usn/childView/RepayBill.vue'),
        meta: { title: 'otc', noTabbar: true },
      },
    ]
  },
  // snatch
  {
    path: '/snatch',
    redirect: '/snatch',
    component: Layout,
    meta: { title: 'otc' },
    children: [
      { // snatch 首页
        path: '/',
        name: 'snatch',
        component: () => import(/* webpackChunkName: "snatch" */ '@/views/snatch/Index'),
        meta: { title: 'otc' },
      },
      { // snatch 抢拍下单
        path: 'grab-shot',
        name: 'grabShot',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/GrabShot.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
      { // snatch 抢拍完成
        path: 'snatch-finish',
        name: 'snatchFinish',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/SnatchFinish.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
      { // usn 债仓记录
        path: 'debt-record',
        name: 'debtRecord',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/DebtRecord.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
      { // snatch 历史价格
        path: 'history-price',
        name: 'historyPrice',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/HistoryPrice.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
      { // snatch 抢拍成功
        path: 'snatch-success',
        name: 'snatchSuccess',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/SnatchSuccess.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
      { // snatch 成功页
        path: 'success',
        name: 'success',
        component: () => import(/* webpackChunkName: "snatch" */ '../views/snatch/childView/Success.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
     
    ]
  },
  // my
  {
    path: '/my',
    redirect: '/my',
    component: Layout,
    meta: { title: 'otc' },
    children: [
      { // usn首页
        path: '/',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/my/Index'),
        meta: { title: 'otc' },
      },
      { // usn 绑定邮箱
        path: '/set-email',
        name: 'setEmail',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/childView/SetEmail.vue'),
        meta: { title: 'otc',noTabbar: true },
      }, 
      { // usn 绑定邮箱
        path: '/email-remind',
        name: 'emailRemind',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/childView/EmailRemind.vue'),
        meta: { title: 'otc',noTabbar: true },
      }, 
      { // usn 邮箱绑定成功
        path: '/email-success',
        name: 'emailSuccess',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/childView/EmailSuccess.vue'),
        meta: { title: 'otc',noTabbar: true },
      },
    ]
  },
  // 404
  {
    path: '*',
    name: 'nopage',
    component: () => import(/* webpackChunkName: "nopage" */ '@/views/error-page/404.vue'),
    meta: { title: '404 - stable' },
  },
];


export default new Router({
  base: '/',
  mode: 'history',
  routes: constantRouter,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
