/* eslint-disable */
import CFClient from './cfws';
import moment from 'moment';
import store from '@/store';

const env = process.env.NODE_ENV;
const client = new CFClient({env, debug: false});

const Io = {
  lastSubscribe: null,
  subscribeCallback: null,
  // 稳定币 k线图部分
  cfwsKline: function (params, subscribe, callback) {
    var me = this;
    let resolution = params.resolution;
    delete params.resolution;
    client.ready(function() {
      var type = 'minute'
      if (resolution == '5') {
        type = 'minute5'
      } else if (resolution == '15') {
        type = 'minute15'
      } else if (resolution == '30') {
        type = 'minute30'
      } else if (resolution == '60') {
        type = 'hour'
      } else if (resolution == '240') {
        type = 'hour4'
      } else if (resolution == '1D') {
        type = 'day'
      } else if (resolution == '1W') {
        type = 'week'
      } else if (resolution == '1M') {
        type = 'month'
      }
      var wsCallback = function(data) {
        const res = {
            resolution: resolution,
            symbol: params.symbol,
            klines: []
        };
        if (data.length > 0) {
          data.forEach(e => {
            res.klines.push({
              date: me.dataFormat(e[0]),
              open: e[1],
              close: e[2],
              high: e[3],
              low: e[4],
              time: e[0] * 1000,
              volume: Number(e[5].toFixed(0))
            })
          });
        }
        callback(res, 'all');
        res.klines = [];
      }
      params.symbol = params.symbol.toLowerCase();
      //请求k线数据
      client.request('kline.' + type, params, function(err, data) {
        if (err) {
          return;
        }
        wsCallback(data)
      })

      if (!subscribe) return;
      client.subscribe(`kline.${type}.${params.symbol}` , params, function(data) {
        const item = {
          close: data.close,
          date: me.dataFormat(data.id),
          high: data.high,
          low: data.low,
          open: data.open,
          time: data.id * 1000,
          volume: Number(data.amount.toFixed(0))
        }
        const res = {
          resolution: resolution,
          symbol: params.symbol,
          klines: [item],
        };
        callback(res, 'one');
      })
    })
  },

  // 取消交易对所有推送
  cfwsUnsubscribe: function(params) {
    let unscribe = '*';
    client.ready(function() {
      if (params) {
        unscribe = params.toLowerCase();
      }
      client.unsubscribe(unscribe);
    });
  },

  // 账号退出
  accountOut: function(account) {
    const chain = store.state.app.scatter.chain || 'eos';
    client.ready(function() {
      client.subscribe('account.message', { account, chain});
    });
  },

  //绑定账号
  accountBind: function(account) {
    const chain = store.state.app.scatter.chain || 'eos';
    client.ready(function() {
      client.subscribe('account.message', {account, chain })
    });
  },

  /*
  * 监听订单变动
  * @param way start 开始监听 stop 停掉监听
  */
  addListenerOrder: function(obj, callback) {
    client.ready(function() {
      if (typeof obj !== 'string' && obj.way === 'stop') {
        client.removeListener(obj.listener);
        return;
      }
      const listener = client.addListener('account.message', function(res){
        res.listener = listener;
        callback(res)
      });
    })
  },

  /*
  * 监听网站暂停服务
  */
  addListenerRefresh: function() {
    client.ready(function() {
      client.addListener('refresh', () => {
        window.alert('The system is upgrading, please wait a moment');
        window.location.reload();
      });
    })
  },
  
  // 时间戳转换
  dataFormat(fdata) {
    return moment.unix(fdata).format('YYYY-MM-DD HH:mm:ss');
  },

  // 搜索功能
  searchWs(params, callback) {
    client.ready(function() {
      client.request('market.markets', { coin: params.coin, key: params.key }, function(err, data) {
        callback(err, data)
      });
    })
  }
  
}

export default Io
