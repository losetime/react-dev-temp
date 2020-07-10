import * as actionType from './actionType'

export const setUserName = (value) => ({
    type: actionType.SET_USER_NAME,
    value
})

export const setWaybillDetailDialogStatus = (value) => ({
    type: actionType.SET_WAYBILL_DETAIL_DIALOG_STATUS,
    value
})

export const setPayAgainDialogStatus = (value) => ({
    type: actionType.SET_PAY_AGAIN_DIALOG_STATUS,
    value
})
