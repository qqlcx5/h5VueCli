/*
 * @Author: Pany
 * @Date: 2019-12-09 14:21:49
 * @Last Modified by: Pany
 * @Last Modified time: 2019-12-21 18:22:45
 */

import https from '../axios'

// 分页查询账户抢拍记录
export function getAuctionRecordPage(params) {
  return new Promise((resolve, reject) => {
    https.get('/auctionRecord/getAuctionRecordPage', params).then((res) => {
      const result = Object.assign(res, {})
      resolve({ status: !result.code, result });
    }, err => {
      reject(err)
    })
  })
}

// 查询爆仓记录抢拍明细
export function blowBefore(params) {
  return new Promise((resolve, reject) => {
    https.post('/auctionRecord/getAuctionDetailsByMcId', params).then((res) => {
      const result = Object.assign(res, {})
      resolve({ status: !result.code, result });
    }, err => {
      reject(err)
    })
  })
}