const Operation = {
  // 运单列表
  getWaybillTableData: {
    method: 'post',
    url: '/api/v2/transport/index'
  },
  // 运单详情
  getWaybillDetail: {
    method: 'post',
    url: '/api/v2/transport/show'
  },
  // 保存银行卡号和持卡人
  saveBankCard: {
    method: 'post',
    url: '/api/v2/transport/saveBankData'
  },
  // 二次支付
  callSecondPay : {
    method: 'post',
    url: '/api/v2/transport/payAgain'
  },
  // 搜索选项
  getSearchOption: {
    method: 'post',
    url: '/api/v2/transport/enumeration'
  },
  // 银行卡信息
  getBankCardInfo: {
    method: 'post',
    url: '/api/v2/transport/checkBank'
  }
}

export default Operation
