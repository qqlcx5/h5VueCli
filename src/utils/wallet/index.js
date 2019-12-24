/* eslint-disable */
/**
 * 支持的钱包：
 *    morewallet  meetone   tokenpocket   mathwallet
 * default：
 *    支持scatter的所有钱包
 */

// 封装的js
import ScatterJS from './scatterJs';
// import TokenPocket from './tokenpocket';
import Lynx from './lynx';

// 来源于哪个APP
let channel = '';

const DApp = {
  obj: null,

  // 设置channel
  setChannel(c, chain) {
    channel = c;
    switch (channel) {
      // tokenpocket
      // case 'tokenpocket':
      //   this.obj = TokenPocket;
      //   break;
      // Lynx
      case 'eoslynx':
        this.obj = Lynx;
        break;
      // 其他钱包支持scatter
      default:
        this.obj = ScatterJS;
        break;
    }
    this.obj.init(chain);
  },

  // 当前账号信息
  getAccount(callback) {
    this.obj.getAccount(callback);
  },

  // 获取余额
  getCurrencyBalance(params, callback) {
    this.obj.getCurrencyBalance(params, callback);
  },

  // 转账
  transfer(params, callback) {
    this.obj.transfer(params, callback);
  },

  // 私钥加密文本
  signText(text, callback) {
    this.obj.signText(text, callback);
  },
  
  // 生成USN
  generateUsn(params, callback) {
    this.obj.generateUsn(params, callback);
  },
  // 偿还USN
  repayUsn(params, callback) {
    this.obj.repayUsn(params, callback);
  },
  // 管理抵押量
  manageStake(params, callback) {
    this.obj.manageStake(params, callback);
  },
  // 爆单抢拍
  snatch(params, callback) {
    this.obj.snatch(params, callback);
  }
}

export default DApp;
