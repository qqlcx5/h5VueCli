/*
 * @Author: Pany
 * @Date: 2019-12-06 15:22:18
 * @Last Modified by: Pany
 * @Last Modified time: 2019-12-16 10:24:15
 */

import https from '../axios'

// 获取公共接口
export function getCommonParam() {
  return new Promise((resolve, reject) => {
    https.get('/common/getCommonParam').then((res) => {
      const result = Object.assign(res, {})
      resolve({ code: !result.code, result });
    }, err => {
      reject(err)
    })
  })
}
