
import * as actionType from './actionType'

const defaultState = {
    userName: '张三',
    waybillDetailDialogStatus: false,
    payAgainDialogStatus: false
}

export default (state=defaultState,action)=> {
    const newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        // 设置username
        case actionType.SET_USER_NAME:
            newState.userName = action.value
            return newState
        // 设置运单详情dialog状态
        case actionType.SET_WAYBILL_DETAIL_DIALOG_STATUS:
            newState.waybillDetailDialogStatus = action.value
            return newState

        // 设置重新支付dialog状态
        case actionType.SET_PAY_AGAIN_DIALOG_STATUS:
            newState.payAgainDialogStatus = action.value
            return newState

        default:
            return state
    }
}
