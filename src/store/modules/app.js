/*
* vuex 全站存储
* get: this.$store.state.模块.state
* 如： this.$store.state.app.language
* set: this.$store.dispatch(actions, value)
* 如： this.$store.dispatch('setLanguage', 'en');
*/

const app = {
  state: {
    language: localStorage.getItem('language') || 'en', // 多语言
    repayDetail: {}, // 偿还时，点击明细展示的列表数据
    accountInfo: null, // 账户信息
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      localStorage.setItem('language', language);
    },
    SET_REPAYDETAIL: (state, repayDetail) => {
      state.repayDetail = repayDetail;
    },
    // 账户信息
    SET_ACCOUNTINFO: (state, accountInfo) => {
      state.accountInfo = accountInfo;
      localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
    setRepayDetail({ commit }, repayDetail) {
      commit('SET_REPAYDETAIL', repayDetail);
    },
    // 账户信息
    setAccountInfo({ commit }, accountInfo) {
      commit('SET_ACCOUNTINFO', accountInfo);
    },
  }
};

export default app;
