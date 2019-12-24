/* eslint-disable */
// import Eos from 'eosjs';
import Eos from 'eosjs-without-sort';

class model {

  constructor() {
    this.vthis = null;
    this.env = process.env.NODE_ENV;
    // 配置
    this.EosJs = Eos({
      httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://eos.newdex.one' : 'http://192.168.8.3:8888',
      chainId: process.env.NODE_ENV === 'production' ? 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' : 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
      verbose: false,
    });;
  }

  /*
   * 稳定币 债仓 预警
   * @params tableKey、indexPosition(3债仓\2预警)、limit
   * 债仓（tableKey: "byissue"， indexPosition: 3）
   * 预警 (tableKey: "byrisk"， indexPosition: 2）
  */
  async getStablecoinInfo(obj, callback) {
    const params = {
      json: true,
      code: 'usncontract1',
      scope: 'usncontract1',
      table: "accounts",
      table_key: obj.tableKey,
      index_position: obj.indexPosition,
      key_type: "i64",
      // lower_bound: key,
      // upper_bound: key,
      limit: obj.limit // 条数
    }
    this.EosJs.getTableRows(params).then(res => callback(res)).catch((e) => {
      this.errorCall(e, callback);
    });
  }

  //  catch 错误回调
  errorCall(e, callback) {
    const self = this;
    const scatapp = store.state.app.scatter;
    console.log('error callback', typeof(e), e); // eslint-disable-line
    let back = {
      code: 100001,
      error: {
        code: 100001
      },
      message: 'Unknown anomaly',
    };
    if (typeof (e) === 'object') {
      back = {
        code: '402',
        error: {
          code: '402',
        },
        message: e.message || 'Privileges have been lost. Please log in again.',
      }
      if (e.code === 402) {
        back.message = e.message;
      }
      if (e.code === 'Scatter') {
        // ${this.vthis.$t('error.error3040005')}
        back.code = '100002'
        back.message = this.vthis.$t('public.scatterDesktop');
      }
      if (e.Error && typeof (e.Error) === 'string' && e.Error.indexOf('No Identity') >= 0) {
        back.message = 'Privileges have been lost. Please log in again.';
        self.accountLoginOut(() => {
          self.getIdentity(self.chainName, () => {});
        });
      }
      if (scatapp && scatapp.identity && !scatterConnected) {
        self.initNext();
      }
      if (e.name === "AssertionError") {
        back.code = '500';
        back.message = e.message;
      }
    }
    if (typeof (e) === 'string') {
      if (e.indexOf('code') >= 0) {
        back = JSON.parse(e);
      } else {
        back = {
          code: '0002',
          error: {
            code: '0002',
          },
          message: 'Failed to get the balance',
        }
      }
    }
    callback(back);
  }
}

export const ChainModel = new model();
export const model2 = model;
export const EosModel = new model();
