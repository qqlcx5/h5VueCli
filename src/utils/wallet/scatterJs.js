/* eslint-disable */

import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs';
import axios from 'axios';

// store
import { dealHost } from '@/utils/public';
import Eos from 'eosjs-without-sort';
import store from '../../store';

ScatterJS.plugins( new ScatterEOS() );

let envobj = null;
let networkOpt = null;
let eosOptions = null;
let EosJs = null;

const regNode = (chain) => {
  if (chain === 'enu' || chain === 'fibos') {
    // 配置
    if (chain === 'enu') {
      EosJs = Enu({
        httpEndpoint: envobj.httpEndpoint,
        chainId: envobj.chainId,
        verbose: false,
      });
    } else if (chain === 'fibos') {
      EosJs = Fibos({
        httpEndpoint: envobj.httpEndpoint,
        chainId: envobj.chainId,
        verbose: false,
      });
    }
    // 网络
    networkOpt = {
      blockchain: chain,
      protocol: envobj.protocol,
      host: envobj.host,
      port: envobj.port,
      chainId: envobj.chainId,
    };
    eosOptions = {
      broadcast: true,
      sign: true,
      chainId: envobj.chainId,
    }
    return;
  }
  // 配置
  EosJs = Eos({
    httpEndpoint: envobj.httpEndpoint,
    chainId: envobj.chainId,
    verbose: false,
  });
  // 网络
  networkOpt = {
    blockchain: 'eos',
    protocol: envobj.protocol,
    host: envobj.host,
    port: envobj.port,
    chainId: envobj.chainId,
  };
  eosOptions = {
    broadcast: true,
    sign: true,
    chainId: envobj.chainId,
  }
}

// 获取节点配置信息
const getNodeInfo = (chain) => {
  let thisChain = chain;
  if (!chain) {
    thisChain = 'eos';
  }
  if (!store.state.sys.nodeList || !store.state.sys.nodeList[`${thisChain}Node`]) {
    setTimeout(() => {
      getNodeInfo(chain);
    }, 100);
    return;
  }
  envobj = store.state.sys.nodeList[`${thisChain}Node`];
  regNode(chain);
}
// 电脑scatter登录时，配置节点信息
// getNodeInfo();

const NewScatterJS = {
  // 保存window.scatter
  scatter: null,
  hasScatter: false,
  scatterEosJs: null,
  times: 0, // 次数
  isWinScatter: false, // 是否是window的scatter

  init(chain) {
    // 新链接带chain参数时 - 没有chain默认eos
    this.initHasChain(chain || 'eos');
    store.dispatch('setUrlChain', chain || 'eos');
  },

  // url带chain时处理方法
  initHasChain(chain) {
    // 直接获取当前链信息
    getNodeInfo(chain);
    if (networkOpt && eosOptions) {
      try {
        /**
         *  eos | bos | meetone ---- EosJs
         *  fibos ---- FibosJs
         *  enu ---- EnuJs
        */
        this.isWinScatter = true;
        if (chain.toLowerCase() === 'enu') { // 目前只支持tp和麦子，内置对象 ironman
          // console.log('enu')
          // Toast('window - enu')
          this.hasScatter = true;
          this.scatter = window.ironman;
          this.scatterEosJs = this.scatter.enu(networkOpt, Enu, eosOptions, 'https');
          return;
        } else if (chain.toLowerCase() === 'fibos') { // 目前只支持fowallet, 内置对象 ironman
          // console.log('fibos')
          // Toast('window - fibos')
          this.hasScatter = true;
          this.scatter = window.ironman;
          this.scatterEosJs = this.scatter.eos(networkOpt, Fibos, eosOptions, 'https');
          return;
        }
        // 其他链，走EosJS，内置对象 scatter | scatterJS
        this.initEosClass();
      } catch (error) {
        this.hasScatter = false;
        setTimeout(() => {
          this.init(chain)
        }, 200);
      }
      return;
    }
    setTimeout(() => {
      this.initHasChain(chain)
    }, 200);
  },

  initEosClass() {
    if (window.scatter) { // 有scatter对象
      this.scatter = window.scatter;
      this.hasScatter = true;
      this.scatterEosJs = this.scatter.eos(networkOpt, Eos, eosOptions, 'https');
      this.isWinScatter = true;
      // Toast('window')
    }
    // 没有scatter对象
    const network = ScatterJS.Network.fromJson(networkOpt);
    ScatterJS.connect('Newdex.io', {network}).then(connected => {
      // Toast('connected === ' + connected)
      if (!connected) {
        setTimeout(() => {
          this.times += 1;
          if (this.times >= 25) {
            return;
          }
          this.initEosClass()
        }, 800);
        return console.error('no scatter');
      }
      // Toast('socket')
      this.times = 0;
      this.isWinScatter = false;
      this.hasScatter = true;
      this.scatterEosJs = ScatterJS.eos(network, Eos);
      this.scatter = ScatterJS; // 链接成功后的别名
    }).catch((error) => {
      console.log(error)
    });
  },

  /* -------- 获取账户信息 start ------- */
  getAccount(callback) {
    if (!this.scatter) {
      setTimeout(() => {
        this.getAccount(callback);
      }, 500);
      return;
    }
    if (this.isWinScatter) {
      this.getAccountByWin(callback);
      return;
    }
    this.scatter.login().then(id => {
      if(!id) return console.error('no identity');
      const account = ScatterJS.account('eos');
      const urlChain = store.state.sys.urlChain;
      const newAccount = {
        account_name: account.name,
        encodeName: Eos.modules.format.encodeName(account.name, false),
        permissions: account.authority,
        chain: urlChain, // 声明账户当前链
        publicKey: account.publicKey,
      }
      callback(null, newAccount)
    });
  },
  getAccountByWin(callback) {
    const self = this;
    // 获取授权
    self.scatter.getIdentity({
      accounts: [networkOpt]
    }).then((identity) => {
      const newAccount = {
        account_name: identity.accounts[0].name,
        encodeName: Eos.modules.format.encodeName(identity.accounts[0].name, false),
        permissions: identity.accounts[0].authority,
        chain: 'eos', // 声明账户当前链
      }
      const urlChain = store.state.sys.urlChain;
      if (!urlChain) {
        if (identity.accounts[0].chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906') { // 主网EOS - chainId
          newAccount.chain = 'eos';
        } else if (identity.accounts[0].chainId === 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86') { // 主网BOS - chainId
          newAccount.chain = 'bos';
        } else if (identity.accounts[0].chainId === '') { // 生产MEETONE - chainId
          newAccount.chain = 'meetone';
        } else if (identity.accounts[0].blockchain === 'enu') { // 生产ENU - chainId
          newAccount.chain = 'enu';
        } else if (identity.accounts[0].blockchain === 'fibos') { // 生产ENU - chainId
          newAccount.chain = 'fibos';
        }
      } else {
        newAccount.chain = urlChain;
      }
      newAccount.chain = newAccount.chain.toLowerCase();

      callback(null, newAccount)
    }).catch((error) => {
      // 用户拒绝
      if (error.code === 402) {
        self.scatter.forgetIdentity();
        return false;
      }
      // 未解锁
      if (error.code === 423) {
        return false;
      }
      return '';
    });
  },
  /* -------- 获取账户信息 end ------- */

  /* -------- 获取余额 start -------- */
  getCurrencyBalance(params, callback) {
    try {
      const newParams = {
        code: params.code,
        symbol: params.coin,
        account: store.state.app.accountInfo.account_name
      }
      axios.post(`${envobj.httpEndpoint}/v1/chain/get_currency_balance`, JSON.stringify(newParams)).then((res) => {
        if (!res.data.length) {
          callback(null, `0.0000 ${params.coin}`);
          return;
        }
        const returnData = res.data[0];
        callback(null, returnData);
      }).catch((e) => {
        console.log(`e: ${e}`); // eslint-disable-line
      })
    } catch (error) {
      setTimeout(() => {
        this.getCurrencyBalance(params, callback);
      }, 200);
    }
  },
  /* -------- 获取余额 end -------- */

  /* -------- 转账 start ------- */
  /*
  * 转账/交易 操作
  * @params code 智能合约
  * @params toAccount 收款者
  * @params quantity  转账额度 如：'7.0000 SYS'
  * @memo 转账备注
  */
  transfer(obj, callback) {
    // scatterEosJs 未配置
    if (!this.hasScatter) {
      setTimeout(() => {
        this.transfer(obj, callback);
      }, 200);
      return;
    }
    // scatterEosJs 已配置
    const fromName = store.state.app.accountInfo.account_name;
    const permission = store.state.app.accountInfo.permissions;
    const quantity = obj.quantity;
    const params = {
      actions: [
        {
          account: obj.code,
          name: 'transfer',
          authorization: [{
            actor: fromName, // 转账者
            permission,
          }],
          data: {
            from: fromName,
            to: obj.toAccount,
            quantity,
            memo: obj.memo
          }
        }
      ]
    };
    if (obj.useFreeCpu) {
      let actor = 'wukongmarket';
      if (dealHost() === 'test') {
        actor = 'newdexcpu111';
      }
      params.actions[0].authorization.unshift({ actor, permission: 'active' })
      this.scatterEosJs.transaction(params, {
        broadcast: !1,
        sign: !0,
      }).then((res) => {
        const l = res.transaction.transaction;
        l.signatures = res.transaction.signatures;
        l.context_free_data = [];
        callback(null, l);
      }).catch((e) => {
        this.errorCall(e, callback)
      });
      return;
    }
    this.scatterEosJs.transaction(params).then((res) => {
      callback(null, res);
    }).catch((e) => {
      this.errorCall(e, callback)
    });
  },
  /* -------- 转账 end ------- */

  /* -------- 签名 start -------- */
  /*
  * 给定的公钥的私钥对任意数据进行签名
  * @params publicKey EOS账户的公钥
  * @params data EOS账户名+时间戳
  * @params whatFor 标题
  * @params isHash data是否为hash
  */
  signText(text, callback) {
    const self = this;
    const whatFor = ''; // 提示用户签名原因
    const isHash = false;
    if (localStorage.getItem('channel').toLowerCase() === 'mykey') {
      const newParams = {
        scope: self.scatter.identity.accounts[0].name,
        code: 'mykeymanager',
        table: 'keydata',
        json: true
      };
      EosJs.getTableRows(newParams).then((response) => {
        const rows = response.rows;
        if (!rows) return
        const publicKey = rows[3].key.pubkey;
        self.scatter.getArbitrarySignature(publicKey, text, whatFor, isHash).then((signature) => {
          callback(null, signature);
        }).catch((error) => {
          callback(error, null);
        });
      });
      return;
    }
    if (this.isWinScatter) {
      this.winScatterSignText(text, callback)
      return;
    }
    // const permission = store.state.app.accountInfo.permissions;
    const publicKey = store.state.app.accountInfo.publicKey;
    if (store.state.app.accountInfo.chain !== 'fibos') {
      self.scatter.getArbitrarySignature(publicKey, text, whatFor, isHash).then((signature) => {
        callback(null, signature);
      }).catch((error) => {
        callback(error, null);
      });
    } else if (store.state.app.accountInfo.chain === 'fibos') {
      self.scatter.getArbitrarySignature(publicKey, text, whatFor, isHash, (err, subData) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, subData.result);
      })
    }
  },
  getAccountMain(callback) {
    const params = {
      account_name: this.scatter.identity.accounts[0].name
    };
    EosJs.getAccount(params).then(callback).catch(e => this.errorCall(e, callback));
  },
  winScatterSignText(text, callback) {
    const self = this;
    const whatFor = ''; // 提示用户签名原因
    const isHash = false;
    self.getAccountMain((res) => {
      // onechain getAccountMain方法连续返回两次 - 1.正常 / 2.错误 - 这个作为容错处理。
      if (res.error) {
        return;
      }
      const permission = self.scatter.identity.accounts[0].authority;
      const publicKey = res.permissions.find(v => v.perm_name === permission).required_auth.keys[0].key;
      if (store.state.app.accountInfo.chain !== 'fibos') {
        self.scatter.getArbitrarySignature(publicKey, text, whatFor, isHash).then((signature) => {
          callback(null, signature);
        }).catch((error) => {
          callback(error, null);
        });
      } else if (store.state.app.accountInfo.chain === 'fibos') {
        self.scatter.getArbitrarySignature(publicKey, text, whatFor, isHash, (err, subData) => {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, subData.result);
        })
      }
    });
  },
  /* -------- 签名 end -------- */

  /* -------- 生成USN - 减少抵押比率生成USN start -------- */
  async generateUsn(obj, callback) {
    console.log('生成USN')
    // scatterEosJs 已配置
    const fromName = store.state.app.accountInfo.account_name;
    const permission = store.state.app.accountInfo.permissions;
    const params = {
      actions: [
        {
          account: 'usncontract1', // 合约账户
          name: 'adjust', // adjust - 下调质押率
          authorization: [{
            actor: fromName, // 转账者
            permission, // 权限 active | owner
          }],
          data: {
            owner: fromName,
            rate: parseInt(obj.percent * 100),
            issue: 1, // 1 - 生成 USN || 0 - 取出EOS
          }
        }
      ]
    };
    this.scatterEosJs.transaction(params).then((res) => {
      callback(null, res);
    }).catch((e) => {
      // alert(e); // eslint-disable-line
      this.errorCall(e, callback)
    });
  },
  /* -------- 生成USN - 减少抵押比率生成USN end -------- */

  /* -------- 偿还USN start -------- */
  async repayUsn(params, callback) {
    console.log('偿还USN')
  },
  /* -------- 偿还USN end -------- */

  /* -------- 管理抵押量 - 减少抵押量 start -------- */
  async manageStake(obj, callback) {
    console.log('管理抵押量')
    // scatterEosJs 已配置
    const fromName = store.state.app.accountInfo.account_name;
    const permission = store.state.app.accountInfo.permissions;
    const params = {
      actions: [
        {
          account: 'usncontract1', // 合约账户
          name: 'withdraw', // adjust - 下调质押率
          authorization: [{
            actor: fromName, // 转账者
            permission, // 权限 active | owner
          }],
          data: {
            owner: fromName,
            quantity: obj.quantity,
          }
        }
      ]
    };
    console.log(params)
    this.scatterEosJs.transaction(params).then((res) => {
      callback(null, res);
    }).catch((e) => {
      // alert(e); // eslint-disable-line
      console.log(e)
      this.errorCall(e, callback)
    });
  },
  /* -------- 管理抵押量 - 减少抵押量 end -------- */

  /* -------- 爆单抢拍 start -------- */
  async snatch(params, callback) {
    console.log('爆单抢拍')
  },
  /* -------- 爆单抢拍 end -------- */

  //  catch 错误回调 ---- code: 3080004 - cpu不足 | 3080002 - net不足 | 3080001 - ram不足
   errorCall(e, callback) {
    let back = {
      error: {
        code: '0001',
      },
      message: 'Unknown anomaly',
    };
    if (typeof (e) === 'object') {
      if (e.code === 402) {
        back = {
          code: '402',
          message: 'User rejected the signature request',
        }
      }
    }
    if (typeof (e) === 'string') {
      const err = JSON.parse(e);
      // 订单上限
      if (e.indexOf('Sorry, your orders has exceeded') !== -1) {
        back = {
          code: 1,
          message: 'too more order',
        }
      }
      // CPU 不足
      if (err.error.code === 3080004) {
        back = {
          code: 3080004,
          message: 'Insufficient CPU resources',
        }
      }
      // NET 不足
      if (err.error.code === 3080002) {
        back = {
          code: 3080002,
          message: 'Insufficient Net resources',
        }
      }
      // RAM 不足
      if (err.error.code === 3080001) {
        back = {
          code: 3080001,
          message: 'Insufficient RAM resources',
        }
      }
    }
    callback(back, null);
  },

  encodeName(name) {
    return Eos.modules.format.encodeName(name, false);
  },
}
export function dealAccountName(name) {
  return NewScatterJS.encodeName(name)
}

export default NewScatterJS;
