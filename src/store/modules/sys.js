// 系统性状态存储
const sys = {
  state: {
    serve: { // 服务器状态设置
      generateStop: 0, // 生成USN暂停
      repayStop: 0, // 偿还USN暂停
      snatchStop: 0, // 爆单抢拍暂停
      addStakeStop: 0, // 增加抵押量暂停
      reduceStakeStop: 0, // 减少抵押量暂停
      allStop: 0, // 整服暂停
    },
    nodeList: localStorage.getItem('nodeList') ? JSON.parse(localStorage.getItem('nodeList')) : null, // 多链默认节点列表
    // url参数传递的链 - 有值: 新版本 | 无值: 旧版本(需兼容)
    urlChain: sessionStorage.getItem('urlChain') ? sessionStorage.getItem('urlChain').toLowerCase() : 'eos',
    channel: localStorage.getItem('channel') ? localStorage.getItem('channel') : '', // app名称
  },
  mutations: {
    SET_SERVE: (state, serve) => {
      state.serve = serve;
    },
    // 多链默认节点列表
    SET_NODELIST: (state, nodeList) => {
      state.nodeList = nodeList;
      localStorage.setItem('nodeList', JSON.stringify(nodeList));
    },
    // url参数传递的链 - 有值: 新版本 | 无值: 旧版本(需兼容)
    SET_URLCHAIN: (state, urlChain) => {
      state.urlChain = urlChain;
      sessionStorage.setItem('urlChain', urlChain);
    },
    // channel
    SET_CHANNEL: (state, channel) => {
      state.channel = channel;
      localStorage.setItem('channel', channel);
    },
  },
  actions: {
    setServe({ commit }, serve) {
      commit('SET_SERVE', serve);
    },
    // 多链默认节点列表
    setNodeList({ commit }, nodeList) {
      commit('SET_NODELIST', nodeList);
    },
    // url参数传递的链 - 有值: 新版本 | 无值: 旧版本(需兼容)
    setUrlChain({ commit }, urlChain) {
      commit('SET_URLCHAIN', urlChain);
    },
    // channel
    setChannel({ commit }, channel) {
      commit('SET_CHANNEL', channel);
    },
  }
};

export default sys;
