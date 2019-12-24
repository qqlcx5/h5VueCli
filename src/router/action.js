import router from './index';
import store from '../store';

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0;
  next();
});

router.afterEach((to) => {
  if (to.name && to.name !== 'nopage') {
    sessionStorage.setItem('afterRouteName', to.name);
  }
  // 退出登录
  const scat = store.state.app.scatter;
  if (scat && !scat.identity && to && to.meta && to.meta.isUser) {
    router.push('/');
  }
  // 未授权
  const token = localStorage.getItem('Frontend-Token');
  if (!token && to && to.meta && to.meta.isToken) {
    router.push('/');
  }
});
