/*
 * @Author: Pany
 * @Date: 2019-12-09 14:21:49
 * @Last Modified by: Pany
 * @Last Modified time: 2019-12-21 17:02:45
 */

import https from '../axios'

// 分页查询爆仓记录
export function getMarginCallPage(params) {
  return new Promise((resolve, reject) => {
    https.get('/marginCall/getMarginCallPage', params).then((res) => {
      const result = Object.assign(res, {})
      resolve({ status: !result.code, result });
    }, err => {
      reject(err)
    })
  })
}

// 开始抢拍
export function blowBefore() {
  return new Promise((resolve, reject) => {
    https.get('/order/blowBefore').then((res) => {
      const result = Object.assign(res, {})
      resolve({ status: !result.code, result });
    }, err => {
      reject(err)
    })
  })
}