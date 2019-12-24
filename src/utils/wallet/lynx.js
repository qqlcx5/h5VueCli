/**
 *
 * lynx 全部接口
 *
 */
/* eslint-disable */
// js
import axios from 'axios';
// import * as compareVersions from 'compare-versions';
import Eos from 'eosjs-without-sort';

// store
import store from '../../store';

// import { Toast } from 'mint-ui';

// let lynx = null; // lynx

const Lynx = {

  ready: false,
  
  /* -------- 初始化 start -------- */
  init() {
    window.addEventListener('lynxMobileLoaded', function listen() {
      // lynx is on the window and ready!
      Lynx.ready = true;
    });
  },
  /* -------- 初始化 end -------- */

  /* -------- 获取账户信息 start -------- */
  async getAccount(callback) {
    if (!this.ready) {
      setTimeout(() => {
        this.getAccount(callback);
      }, 100);
    } else {
      let account = await this.syncGetAccount();
      callback(null, account);
    }
  },

  async syncGetAccount() {
    let result = '';
    try {
      result = await window.lynxMobile.requestSetAccount();
    } catch (err) {
      alert(JSON.stringify(err));
      return;
    }
    let chain = 'eos';
    if (result.chainId === 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86') { // bos
      chain = 'bos';
    } else if (result.chainId === '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11') { // telos
      chain = 'telos';
    } else if (result.chainId === 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422') { // meetone
      chain = 'meetone';
    } else if (result.chainId === 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f') { // enu
      chain = 'enu';
    } else if (result.chainId === '6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a') { // fibos
      chain = 'fibos';
    } else if (result.chainId === '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4') { // wax
      chain = 'wax';
    }
    const newData = {
      account_name: result.account.account_name,
      encodeName: Eos.modules.format.encodeName(result.account.account_name, false),
      address: '',
      permissions: [],
      chain,
    }
    if (result.account.permissions[0].perm_name === 'active') {
      newData.permissions.push('active');
    } else {
      newData.permissions.push('owner');
    }
    return newData;
  },
  /* -------- 获取账户信息 end -------- */

  /* -------- 获取余额 start -------- */
  getCurrencyBalance(params, callback) {
    const newParams = {
      code: params.code,
      symbol: params.coin,
      account: store.state.app.accountInfo.account_name
    }
    const chainNode = `${store.state.app.accountInfo.chain}Node`
    axios.post(`${store.state.sys.nodeList[chainNode].httpEndpoint}/v1/chain/get_currency_balance`, JSON.stringify(newParams)).then((res) => {
      if (!res.data.length) {
        callback(null, `0.0000 ${params.coin}`);
        return;
      }
      const returnData = res.data[0];
      callback(null, returnData);
    }).catch((e) => {
      console.log(`e: ${e}`); // eslint-disable-line
    })
  },
  /* -------- 获取余额 end -------- */

  /* -------- 转账 start -------- */
  async transfer(params, callback) {
    let result;
    // const chain = store.state.app.accountInfo.chain;
    let transcation = {
      contract: params.code,
      symbol: params.tokenName,
      toAccount: params.toAccount,
      amount: params.quantity.split(' ')[0],
      memo: params.memo,
    };
    try {
      result = await window.lynxMobile.transfer(transcation);
    } catch (err) {
      if (err.code && err.code === 500) { // 处理错误吗500
        this.errorCall(err, callback)
      }
      return;
    }
    callback(null, result);
    // console.log(result);
  },
  /* -------- 转账 end -------- */

  /* -------- 签名 start -------- */
  async signText(text, callback) {
    let result;
    try {
      result = await window.lynxMobile.requestArbitrarySignature({
        data: text,
        whatFor: 'sign Account',
      });
    } catch (err) {
      return;
    }
    callback(null, result);
  },
  /* -------- 签名 end -------- */

  /* -------- 生成USN - 减少抵押比率生成USN start -------- */
  async generateUsn(obj, callback) {
    let result;
    try {
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
      result = await window.lynxMobile.transact(params);
    } catch (err) {
      if (err.code && err.code === 500) { // 处理错误吗500
        this.errorCall(err, callback)
      }
      return;
    }
    callback(null, result);
    // console.log(result);
  },
  /* -------- 生成USN - 减少抵押比率生成USN end -------- */

  /* -------- 管理抵押量 - 减少抵押量 start -------- */
  async manageStake(obj, callback) {
    let result;
    try {
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
      result = await window.lynxMobile.transact(params);
    } catch (err) {
      if (err.code && err.code === 500) { // 处理错误吗500
        this.errorCall(err, callback)
      }
      return;
    }
    callback(null, result);
    // console.log(result);
  },
  /* -------- 管理抵押量 - 减少抵押量 end -------- */

  //  catch 错误回调 ---- code: 3080004 - cpu不足 | 3080002 - net不足 | 3080001 - ram不足
  errorCall(e, callback) {
    const origin = e;
    let back = {
      code: 1000,
      message: 'Unknown anomaly',
    };
    const err = JSON.stringify(e);
    // 订单上限
    if (err.indexOf('Sorry, your orders has exceeded') !== -1) {
      back = {
        code: 1,
        message: 'too more order',
      }
    }
    // CPU 不足
    if (origin.error.code === 3080004) {
      back = {
        code: 3080004,
        message: 'Insufficient CPU resources',
      }
    }
    // NET 不足
    if (origin.error.code === 3080002) {
      back = {
        code: 3080002,
        message: 'Insufficient Net resources',
      }
    }
    // RAM 不足
    if (origin.error.code === 3080001) {
      back = {
        code: 3080001,
        message: 'Insufficient RAM resources',
      }
    }
    callback(back, null);
  },
}

export default Lynx;
