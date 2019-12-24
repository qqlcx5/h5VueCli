import { Decimal } from 'decimal.js';
import { toFixed } from '@/utils/public.js'
/* -------- 生成USN start -------- */
/**
 * 生成USN
 * 需求一
 * 已知抵押比率，计算生成数量
 * in：
 * allStaked: 之前总抵押（接口数据）
 * allGenerate: 之前总生成（接口数据）
 * allInterest: 之前总利息（接口数据）
 * eosPrice: eos价格指数（接口数据）
 * newStaked: 新增抵押量 - 用户输入
 * newPercent: 新抵押比率 - 用户输入 - eg: 150%
 *
 * out：
 * allStaked: 计算后抵押总量 = in.allStaked + in.newStaked
 * allGenerate: 计算后总生成 = ((out.allStaked * in.eosPrice) / (in.newPercent / 100)) - in.allInterest
 * newMaxGenerate: 计算后最大生成 - 150%计算得出 = ((out.allStaked * in.eosPrice) / 1.5) - in.allInterest - in.allGenerate
 * newGenerate: 计算后新生成 = 总（新） - 总（旧）= out.allGenerate - in.allGenerate
 * snatchPrice: 爆仓价格 = (out.allGenerate + in.allInterest) * 1.35 / (out.allStaked * in.eosPrice)
 * percent: 新抵押比率 = in.percent
 * rangPercent: 滑块比率 - 150% ～ 500% 之间
 *
 * 需求二
 * 已知生成数量，计算抵押比率
 * in：
 * allStaked: 之前总抵押（接口数据）
 * allGenerate: 之前总生成（接口数据）
 * allInterest: 之前总利息（接口数据）
 * eosPrice: eos价格指数（接口数据）
 * newStaked: 新增抵押量 - 用户输入
 * newGenerate: 新生成 - 用户输入 - eg: 100USN
 *
 * out：
 * allStaked: 计算后抵押总量 = in.allStaked + in.newStaked
 * allGenerate: 计算后总生成 = in.allGenerate + in.newGenerate
 * newMaxGenerate: 计算后最大生成 - 150%计算得出 = ((out.allStaked * in.eosPrice) / 1.5) - in.allInterest - in.allGenerate
 * newGenerate: 新生成 = in.newGenerate
 * snatchPrice: 爆仓价格 = (out.allGenerate + in.allInterest) * 1.35 / (out.allStaked * in.eosPrice)
 * percent: 新抵押比率 = (out.allStaked * in.eosPrice * 100) / (out.allGenerate + in.allInterest)
 * rangPercent: 滑块比率 - 150% ～ 500% 之间
 */
function dealPercentForRange(percent) {
  if (Number(percent) <= 150) {
    return 150;
  }
  if (Number(percent) >= 500) {
    return 500;
  }
  return Number(percent);
}
// 生成USN - 计算生成数量
function dealGenerateNum(inData) {
  let percent = Number(inData.newPercent) <= 150 ? 150 : Number(inData.newPercent);
      percent = toFixed(Number(percent), 2);
  // allStaked = in.allStaked + in.newStaked
  const allStaked = toFixed(Decimal.add(Number(inData.allStaked), Number(inData.newStaked)).toString(), 4);
  // allGenerate = ((out.allStaked * in.eosPrice * 100) / (percent)) - in.allInterest
  let allGenerate = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
      allGenerate = Decimal.mul(Number(allGenerate), 100);
      allGenerate = Decimal.div(Number(allGenerate), Number(percent));
      allGenerate = Decimal.sub(Number(allGenerate), Number(inData.allInterest));
      allGenerate = toFixed(allGenerate.toString(), 4)
  // newMaxGenerate = ((out.allStaked * in.eosPrice) / 1.5) - in.allInterest - in.allGenerate
  let newMaxGenerate = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
      newMaxGenerate = Decimal.div(Number(newMaxGenerate), 1.5);
      newMaxGenerate = Decimal.sub(Number(newMaxGenerate), Number(inData.allInterest));
      newMaxGenerate = Decimal.sub(Number(newMaxGenerate), Number(inData.allGenerate));
      newMaxGenerate = toFixed(newMaxGenerate.toString(), 4)
  // newGenerate = out.allGenerate - in.allGenerate
  let newGenerate = Decimal.sub(Number(allGenerate), Number(inData.allGenerate));
      newGenerate = toFixed(newGenerate.toString(), 4)
  // snatchPrice = (out.allGenerate + in.allInterest) * 1.35 / (out.allStaked * in.eosPrice)
  let snatchPrice = '0.0000';
  if (Number(allStaked)) {
    snatchPrice = Decimal.add(Number(allGenerate), Number(inData.allInterest));
    snatchPrice = Decimal.mul(Number(snatchPrice), 1.35);
    snatchPrice = Decimal.div(Number(snatchPrice), Number(allStaked));
    snatchPrice = Decimal.div(Number(snatchPrice), Number(inData.eosPrice));
    snatchPrice = toFixed(snatchPrice.toString(), 4);
  }
  const rangPercent = dealPercentForRange(percent);
  const outData = {
    allStaked,
    allGenerate,
    newMaxGenerate,
    newGenerate,
    snatchPrice,
    percent,
    rangPercent
  }
  return outData;
}
// 生成USN - 计算抵押比率
function dealGeneratePercent(inData) {
  // allStaked = in.allStaked + in.newStaked
  const allStaked = toFixed(Decimal.add(Number(inData.allStaked), Number(inData.newStaked)).toString(), 4);
  // newMaxGenerate = ((out.allStaked * in.eosPrice) / 1.5) - in.allInterest - in.allGenerate
  let newMaxGenerate = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
      newMaxGenerate = Decimal.div(Number(newMaxGenerate), 1.5);
      newMaxGenerate = Decimal.sub(Number(newMaxGenerate), Number(inData.allInterest));
      newMaxGenerate = Decimal.sub(Number(newMaxGenerate), Number(inData.allGenerate));
      newMaxGenerate = toFixed(newMaxGenerate.toString(), 4)
  // allGenerate = in.allGenerate + in.newGenerate
  const allGenerate = toFixed(Decimal.add(Number(inData.allGenerate), Number(inData.newGenerate)).toString(), 4)
  // snatchPrice = (out.allGenerate + in.allInterest) * 1.35 / (out.allStaked * in.eosPrice)
  let snatchPrice = '0.0000';
  if (Number(allStaked)) {
    snatchPrice = Decimal.add(Number(allGenerate), Number(inData.allInterest));
    snatchPrice = Decimal.mul(Number(snatchPrice), 1.35);
    snatchPrice = Decimal.div(Number(snatchPrice), Number(allStaked));
    snatchPrice = Decimal.div(Number(snatchPrice), Number(inData.eosPrice));
    snatchPrice = toFixed(snatchPrice.toString(), 4);
  }
  const newGenerate = toFixed(inData.newGenerate, 4);
  // percent = (out.allStaked * in.eosPrice * 100) / (out.allGenerate + in.allInterest)
  const allUsn = Decimal.add(allGenerate, inData.allInterest)
  let percent = '150.00';
  if (Number(allUsn)) {
    percent = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
    percent = Decimal.mul(Number(percent), Number(100));
    percent = Decimal.div(Number(percent), Number(allUsn));
    percent = toFixed(percent.toString(), 2);
  }
  const rangPercent = dealPercentForRange(percent);
  const outData = {
    allStaked,
    allGenerate,
    newMaxGenerate,
    newGenerate,
    snatchPrice,
    percent,
    rangPercent
  }
  return outData;
}
export function generateUsn(inData) {
  if (inData.type === 'num') {
    return dealGenerateNum(inData);
  }
  return dealGeneratePercent(inData)
}
/* -------- 生成USN end -------- */

/* -------- 偿还USN start -------- */
/**
 * 偿还USN
 * 需求1:
 * 只进行偿还，不减少抵押量
 * inData：
 * allStaked: 之前总抵押（接口数据）
 * allGenerate: 之前总生成（接口数据）
 * allInterest: 之前总利息（接口数据）
 * eosPrice: eos价格指数（接口数据）
 * orderList: 租借中订单列表（接口数据）
 * repayNum: 偿还USN数量 - 用户输入
 *
 * 计算偿还本金 & 利息 & 偿还列表
 * let surplusNum = inData.repayNum; // 剩余还款金
 * let principal = 0; // 本金
 * let interest = 0; // 利息
 * const repayArr = [];
 * orderList.forEach((item, index) => {
 *  if (Number(surplusNum) <= 0) { // 剩余还款金全部还掉 - 不执行后续操作
 *    return;
 *  }
 *  const itemAllUsn = item.generate + item.interest; // 单条订单总还款USN = 总生成 + 总利息
 *  if (surplusNum >= itemAllUsn) { // 剩余还款金足够偿还单笔订单
 *    surplusNum -= itemAllUsn;
 *    principal += item.generate; // 本金累计
 *    interest += item.interest; // 利息累计
 *    repayArr.push(item)
 *    return;
 *  }
 *  // 剩余还款金不足以完全偿还单笔订单 - 计算剩余偿还金所偿还的本金和利息
 *  const itemPrincipal = (surplusNum * item.generate) / itemAllUsn; // 单笔订单偿还本金
 *  const itemInterest = surplusNum - itemPrincipal; // 单笔订单偿还利息
 *  const t = item;
 *  t.itemPrincipal = itemPrincipal;
 *  t.itemInterest = itemInterest;
 *  repayArr.push(t)
 *  principal += itemPrincipal; // 本金累计
 *  interest += itemInterest; // 利息累计
 * })
 *
 * out：
 * repayInterest: 偿还利息 = interest
 * allStaked: 计算后抵押总量 = inData.allStaked
 * allGenerate: 计算后总生成 = inData.allGenerate - principal;
 * newInterest: 计算后剩余利息 = inData.allInterest - out.repayInterest
 * snatchPrice: 爆仓价格 = (out.allGenerate + out.newInterest) * 1.35 / (out.allStaked * in.eosPrice)
 * percent: 新抵押比率 = (out.allStaked * in.eosPrice * 100) / (out.allGenerate + out.newInterest)
 * repayArr: 偿还列表 = repayArr
 *
 *
 * 需求2:
 * 进行偿还，并且减少抵押量 -> 已知偿还金额 & 最终抵押比率，求：偿还明细 & 赎回金额
 * inData：
 *
 * out：
 * repayInterest: 偿还利息 = interest
 * allGenerate: 计算后总生成 = inData.allGenerate - principal;
 * newInterest: 计算后剩余利息 = inData.allInterest - out.repayInterest
 * percent: inData.newPercent
 * repayArr: 偿还列表 = repayArr
 * allStaked: 计算后抵押总量 = percent * (out.allGenerate + out.newInterest) / (100 * inData.eosPrice)
 * snatchPrice: 爆仓价格 = (out.allGenerate + out.newInterest) * 1.35 / (out.allStaked * in.eosPrice)
 * unstakedNum: 减少抵押量 = inData.allStaked - out.allStaked
 */
function repayDetail(inData) {
  let surplusNum = inData.repayNum; // 剩余还款金
  let principal = 0; // 本金
  let interest = 0; // 利息
  const repayArr = []; // 偿还明细
  inData.orderList.forEach((item) => {
    if (Number(surplusNum) <= 0) { // 剩余还款金全部还掉 - 不执行后续操作
      return;
    }
    const itemAllUsn = Decimal.add(item.generate, item.interest).toString(); // 单条订单总还款USN = 总生成 + 总利息
    if (Number(surplusNum) >= Number(itemAllUsn)) { // 剩余还款金足够偿还单笔订单
      surplusNum = Decimal.sub(surplusNum, itemAllUsn).toString();
      principal = Decimal.add(principal, item.generate).toString(); // 本金累计
      interest = Decimal.add(interest, item.interest).toString(); // 利息累计
      repayArr.push(item);
      return;
    }
    // 剩余还款金不足以完全偿还单笔订单 - 计算剩余偿还金所偿还的本金和利息
    let itemPrincipal = Decimal.mul(surplusNum, item.generate);
        itemPrincipal = Decimal.div(itemPrincipal, itemAllUsn).toString(); // 单笔订单偿还本金
    const itemInterest = Decimal.sub(surplusNum, itemPrincipal).toString(); // 单笔订单偿还利息
    surplusNum = 0;
    const t = item;
    t.itemPrincipal = itemPrincipal;
    t.itemInterest = itemInterest;
    repayArr.push(t)
    principal = toFixed(Decimal.add(principal, itemPrincipal).toString(), 4); // 本金累计
    interest = toFixed(Decimal.add(interest, itemInterest).toString(), 4); // 利息累计
  })
  return {
    interest,
    principal,
    repayArr,
  }
}
function onlyRepayUsn(inData) {
  const {interest, principal, repayArr} = repayDetail(inData);
  const repayInterest = toFixed(Number(interest), 4); // 偿还利息
  const allStaked = toFixed(Number(inData.allStaked), 4);
  const allGenerate = toFixed(Decimal.sub(Number(inData.allGenerate), Number(principal)), 4); // 偿还后总生成
  const newInterest = toFixed(Decimal.sub(Number(inData.allInterest), Number(repayInterest)), 4); // 偿还后剩余利息
  let snatchPrice = '0.0000';
  if (Number(allStaked)) {
    snatchPrice = Decimal.add(Number(allGenerate), Number(newInterest));
    snatchPrice = Decimal.mul(Number(snatchPrice), 1.35);
    snatchPrice = Decimal.div(Number(snatchPrice), Number(allStaked));
    snatchPrice = Decimal.div(Number(snatchPrice), Number(inData.eosPrice)); // 爆仓价格
    snatchPrice = toFixed(Number(snatchPrice), 4);
  }
  const allUsn = Decimal.add(Number(allGenerate), Number(newInterest));
  let percent = '0.00';
  if (Number(allUsn)) {
    percent = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
    percent = Decimal.mul(Number(percent), 100);
    percent = Decimal.div(Number(percent), Number(allUsn));
    percent = toFixed(Number(percent), 2);
  }
  const rangPercent = dealPercentForRange(percent);
  let maxUnstakedNum = Decimal.add(Number(allGenerate), Number(newInterest));
      maxUnstakedNum = Decimal.mul(Number(maxUnstakedNum), 1.5);
      maxUnstakedNum = Decimal.div(Number(maxUnstakedNum), Number(inData.eosPrice));
      maxUnstakedNum = Decimal.sub(Number(inData.allStaked), Number(maxUnstakedNum));
      maxUnstakedNum = toFixed(maxUnstakedNum, 4);
  return {
    repayInterest,
    allStaked,
    allGenerate,
    newInterest,
    snatchPrice,
    percent,
    rangPercent,
    repayArr,
    maxUnstakedNum
  }
}
function repayUsnAndUnstaked(inData) {
  const {interest, principal, repayArr} = repayDetail(inData);
  const repayInterest = toFixed(Number(interest), 4); // 偿还利息
  const allGenerate = toFixed(Decimal.sub(Number(inData.allGenerate), Number(principal)), 4); // 偿还后总生成
  const newInterest = toFixed(Decimal.sub(Number(inData.allInterest), Number(repayInterest)), 4); // 偿还后剩余利息
  let percent = toFixed(Number(inData.newPercent), 2)
  if (Number(percent) <= 150) {
    percent = '150.00';
  }
  const rangPercent = dealPercentForRange(percent);
  let allStaked = Decimal.add(Number(allGenerate), Number(newInterest));
      allStaked = Decimal.mul(Number(allStaked), Number(percent));
      allStaked = Decimal.div(Number(allStaked), 100);
      allStaked = Decimal.div(Number(allStaked), Number(inData.eosPrice));
      allStaked = toFixed(allStaked, 4);
  if (Number(allStaked) > Number(inData.allStaked)) {
    allStaked = Number(inData.allStaked);
  }
  if (!Number(allStaked)) {
    percent = '0.00';
  }
  let snatchPrice = '0.0000';
  if (Number(allStaked)) {
    snatchPrice = Decimal.add(Number(allGenerate), Number(newInterest));
    snatchPrice = Decimal.mul(Number(snatchPrice), 1.35);
    snatchPrice = Decimal.div(Number(snatchPrice), Number(allStaked));
    snatchPrice = Decimal.div(Number(snatchPrice), Number(inData.eosPrice));
    snatchPrice = toFixed(snatchPrice, 4);
  }
  const unstakedNum = toFixed(Decimal.sub(Number(inData.allStaked), Number(allStaked)), 4);
  let maxUnstakedNum = Decimal.add(Number(allGenerate), Number(newInterest));
      maxUnstakedNum = Decimal.mul(Number(maxUnstakedNum), 1.5);
      maxUnstakedNum = Decimal.div(Number(maxUnstakedNum), Number(inData.eosPrice));
      maxUnstakedNum = Decimal.sub(Number(inData.allStaked), Number(maxUnstakedNum));
      maxUnstakedNum = toFixed(maxUnstakedNum, 4);
  return {
    repayInterest,
    allStaked,
    allGenerate,
    newInterest,
    snatchPrice,
    percent,
    rangPercent,
    repayArr,
    unstakedNum,
    maxUnstakedNum,
  }
}

export function repayUsn(inData) {
  if (inData.type !== 'unstaked') {
    return onlyRepayUsn(inData);
  }
  return repayUsnAndUnstaked(inData)
}
/* -------- 偿还USN end -------- */

/* -------- 管理抵押量 start -------- */
/**
 * 管理抵押量
 * 需求1:
 * 增加抵押量
 * inData:
 * allStaked: 之前总抵押（接口数据）
 * allGenerate: 之前总生成（接口数据）
 * allInterest: 之前总利息（接口数据）
 * eosPrice: eos价格指数（接口数据）
 * stakeNum: 新增抵押（用户输入）
 *
 * out:
 * allStaked: 计算后抵押总量 = inData.allStaked + inData.stakeNum
 * allGenerate: 计算后总生成 = inData.allGenerate;
 * snatchPrice: 爆仓价格 = (out.allGenerate + inData.allInterest) * 1.35 / (out.allStaked * inData.eosPrice)
 * percent: 新抵押比率 = (out.allStaked * in.eosPrice * 100) / (out.allGenerate + inData.allInterest)
 * maxUnstakedNum: 最大可减少 = inData.allStaked - (1.5 * (inData.allGenerate + inData.allInterest)) / inData.eosPrice
 */
export function manageStake(inData) {
  // allStaked: 计算后抵押总量 = inData.allStaked + inData.stakeNum
  let allStaked = '0.0000';
  if (inData.type !== 'add') {
    allStaked = Decimal.sub(Number(inData.allStaked), Number(inData.stakeNum)).toString();
  } else {
    allStaked = Decimal.add(Number(inData.allStaked), Number(inData.stakeNum)).toString();
  }
  if (Number(allStaked) < 0) {
    allStaked = 0;
  }
  allStaked = toFixed(allStaked, 4);
  // allGenerate: 计算后总生成 = inData.allGenerate;
  const allGenerate = inData.allGenerate;
  // snatchPrice: 爆仓价格 = (out.allGenerate + inData.allInterest) * 1.35 / (out.allStaked * inData.eosPrice)
  let snatchPrice = '0.0000';
  if (Number(allStaked) > 0) {
    snatchPrice = Decimal.add(Number(allGenerate), Number(inData.allInterest));
    snatchPrice = Decimal.mul(snatchPrice, 1.35);
    snatchPrice = Decimal.div(snatchPrice, Number(allStaked));
    snatchPrice = Decimal.div(snatchPrice, Number(inData.eosPrice)).toString();
    snatchPrice = toFixed(snatchPrice, 4);
  }
  // percent: 新抵押比率 = (out.allStaked * in.eosPrice * 100) / (out.allGenerate + inData.allInterest)
  const allUsn = Decimal.add(Number(allGenerate), Number(inData.allInterest));
  let percent = '0.00';
  if (Number(allStaked) > 0) {
    percent = Decimal.mul(Number(allStaked), Number(inData.eosPrice));
    percent = Decimal.mul(Number(percent), 100);
    percent = Decimal.div(Number(percent), Number(allUsn));
    percent = toFixed(Number(percent), 2);
  }
  let maxUnstakedNum = Decimal.mul(Number(allUsn), 1.5);
      maxUnstakedNum = Decimal.div(Number(maxUnstakedNum), Number(inData.eosPrice));
      maxUnstakedNum = Decimal.sub(Number(inData.allStaked), Number(maxUnstakedNum));
      maxUnstakedNum = toFixed(maxUnstakedNum, 4);
  return {
    allStaked,
    allGenerate,
    snatchPrice,
    percent,
    maxUnstakedNum,
  }
}
/* -------- 管理抵押量 end -------- */
