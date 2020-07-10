import React, { Fragment, useState, useEffect, useRef } from 'react'
import $http from '@/service/http'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '@/store/actions'
import '@/style/operation/waybill.less'
import { Modal, Form, Input } from 'antd'

const DetailDialog = (props) => {
    const [finishStatus, setFinishStatus] = useState(false)

    const [waybillDetail, setWaybillDetail] = useState({})
    const [bankCardNo, setBankCardNo] = useState('')
    const [bankCardName, setBankCardName] = useState('')

    useEffect(() => {
        setWaybillDetail(props.waybillDetail)
        setBankCardNo(props.waybillDetail.driverBankNo)
        setBankCardName(props.waybillDetail.bankCardHolder)
    }, [props.waybillDetail])



    const handleCancel = () => {
        props.actions.setWaybillDetailDialogStatus(false)
    }

    const handleOk = () => {
        setFinishStatus(true)
        console.log(waybillDetail)
        console.log(waybillDetail.driverBankNo, bankCardNo, waybillDetail.driverBankNo != bankCardNo)
        console.log(waybillDetail.bankCardHolder, bankCardName, waybillDetail.bankCardHolder != bankCardName)
        if (props.waybillDetail.driverBankNo != bankCardNo || props.waybillDetail.bankCardHolder != bankCardName) {
            $http.saveBankCard({
                transportId: waybillDetail.transportId,
                bankNo: bankCardNo,
                bankCardHolder: bankCardName
            }).then(res => {
                setFinishStatus(false)
                if (res.code === 0) {
                    props.actions.setWaybillDetailDialogStatus(false)
                    props.actions.setPayAgainDialogStatus(true)
                }
            })
        } else {
            props.actions.setWaybillDetailDialogStatus(false)
            props.actions.setPayAgainDialogStatus(true)
        }

    }

    const onFinish = values => {
        console.log('Success:', values)

    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const onValuesChange = (changedFields, allFields) => {
        console.log(changedFields, allFields)
    }

    const onFieldsChange = (changedFields, allFields) => {

        console.log(changedFields, allFields)
    }

    const onChangeBackCardNum = (event) => {
        const newWaybillDetail = JSON.parse(JSON.stringify(waybillDetail))
        newWaybillDetail.driverBankNo = event.target.value
        setBankCardNo(event.target.value)
        $http.getBankCardInfo({
            bankNo: event.target.value
        }).then(res=>{
            if(res.code === 0) {
                newWaybillDetail.bankName = res.data.bankName
            }
            setWaybillDetail(newWaybillDetail)
        })
    }

    const onChangeBackCardName = event => {
        setBankCardName(event.target.value)
    }

    return (
        <Fragment>
            <Modal
                cancelText='取消'
                confirmLoading={finishStatus}
                okText='重新支付'
                onCancel={handleCancel}
                onOk={handleOk}
                title='查看/修改'
                visible={props.detailDialogStatus}
                width={1000}
            >
                <div className='detail-dialog-wrap'>
                    <div className='form-title'>
                        <p>运单信息</p>
                        <p className='waybill-status'>{waybillDetail.transportStatusName}</p>
                    </div>
                    <div className='waybill-info-wrap'>
                        <div>
                            <p>运单编号</p>
                            <Input disabled
                                value={waybillDetail.transportSn}
                            />
                        </div>
                        <div>
                            <p>车牌号</p>
                            <Input disabled
                                value={waybillDetail.vehicleNo}
                            />
                        </div>
                        <div>
                            <p>运单来源</p>
                            <Input disabled
                                value={waybillDetail.dataSourceName}
                            />
                        </div>
                        <div>
                            <p>司机姓名</p>
                            <Input disabled
                                value={waybillDetail.driverName}
                            />
                        </div>
                        <div>
                            <p>运单创建企业</p>
                            <Input disabled
                                value={waybillDetail.createCompany}
                            />
                        </div>
                        <div>
                            <p>联系方式</p>
                            <Input disabled
                                value={waybillDetail.driverTel}
                            />
                        </div>
                        <div>
                            <p>运单创建时间</p>
                            <Input disabled
                                value={waybillDetail.createdAt}
                            />
                        </div>
                        <div>
                            <p>身份证号</p>
                            <Input disabled
                                value={waybillDetail.driverIdentityNo}
                            />
                        </div>
                        <div>
                            <p>运单创建人</p>
                            <Input disabled
                                value={waybillDetail.createUserName}
                            />
                        </div>
                        <div>
                            <p>装货时间</p>
                            <Input disabled
                                value={waybillDetail.upstreamLoadedA}
                            />
                        </div>
                        <div>
                            <p>装货企业</p>
                            <Input disabled
                                value={waybillDetail.packCompany}
                            />
                        </div>
                        <div>
                            <p>装货净重(吨)</p>
                            <Input disabled
                                value={waybillDetail.upstreamRealTransportWeight}
                            />
                        </div>
                        <div>
                            <p>卸货企业</p>
                            <Input disabled
                                value={waybillDetail.unloadCompany}
                            />
                        </div>
                        <div>
                            <p>卸货时间</p>
                            <Input disabled
                                value={waybillDetail.unloadLoadedAt}
                            />
                        </div>
                        <div>
                            <p>运价(元/吨)</p>
                            <Input disabled
                                value={waybillDetail.freightCost}
                            />
                        </div>
                        <div>
                            <p>卸货净重(吨)</p>
                            <Input disabled
                                value={waybillDetail.unloadingWeight}
                            />
                        </div>
                        <div>
                            <p>允许货损(公斤/车)</p>
                            <Input disabled
                                value={waybillDetail.allowLoss}
                            />
                        </div>
                        <div>
                            <p>货损(吨)</p>
                            <Input disabled
                                value={waybillDetail.lossWeight}
                            />
                        </div>
                        <div>
                            <p>亏吨单价(元)</p>
                            <Input disabled
                                value={waybillDetail.lossCost}
                            />
                        </div>
                        <div>
                            <p>应付运费(元)</p>
                            <Input disabled
                                value={waybillDetail.freightPayAmount}
                            />
                        </div>
                        <div>
                            <p>杂项(元)</p>
                            <Input disabled
                                value={waybillDetail.miscellaneousExpenses}
                            />
                        </div>
                        <div>
                            <p>油费金额(元)</p>
                            <Input disabled
                                value={waybillDetail.oilFeeAmount}
                            />
                        </div>
                        <div>
                            <p>备注</p>
                            <Input disabled
                                value={waybillDetail.remark}
                            />
                        </div>
                        <div>
                            <p>计算运费(元)</p>
                            <Input disabled
                                value={waybillDetail.freight}
                            />
                        </div>

                        {/* <Form
                            initialValues={waybillDetail}
                            layout={'inline'}
                            name='basic'
                            onFieldsChange={onFieldsChange}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            onValuesChange={onValuesChange}
                        >
                            <Form.Item
                                colon={false}
                                label='运单编号'
                                name='transportSn'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='车牌号'
                                name='vehicleNo'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='运单来源'
                                name='dataSourceName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='司机姓名'
                                name='driverName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='运单创建企业'
                                name='createCompany'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='联系方式'
                                name='driverTel'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='运单创建时间'
                                name='createdAt'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='身份证号'
                                name='driverIdentityNo'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='运单创建人'
                                name='createUserName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='装货时间'
                                name='upstreamLoadedA'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='装货企业'
                                name='packCompany'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='装货净重(吨)'
                                name='upstreamRealTransportWeight'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='卸货企业'
                                name='unloadCompany'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='卸货时间'
                                name='unloadLoadedAt'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='运价(元/吨)'
                                name='freightCost'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='卸货净重(吨)'
                                name='unloadingWeight'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='允许货损(公斤/车)'
                                name='allowLoss'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='货损(吨)'
                                name='lossWeight'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='亏吨单价(元)'
                                name='lossCost'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='应付运费(元)'
                                name='freightPayAmount'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='杂项(元)'
                                name='miscellaneousExpenses'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='油费金额(元)'
                                name='oilFeeAmount'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='备注'
                                name='remark'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='计算运费(元)'
                                name='freight'
                            >
                                <Input disabled />
                            </Form.Item>
                        </Form> */}
                    </div>

                    <div className='form-title'>
                        <p>支付信息</p>
                        <p className='pay-status'>{waybillDetail.tradeReason}</p>
                    </div>
                    <div className='pay-info-wrap'>
                        <div>
                            <p>支付时间</p>
                            <Input disabled
                                value={waybillDetail.payTime}
                            />
                        </div>
                        <div>
                            <p>银行卡号</p>
                            <Input
                                onChange={onChangeBackCardNum}
                                value={waybillDetail.driverBankNo}
                            />
                        </div>
                        <div>
                            <p>支付单编号</p>
                            <Input disabled
                                value={waybillDetail.cashStatementSn}
                            />
                        </div>
                        <div>
                            <p>银行名称</p>
                            <Input disabled
                                value={waybillDetail.bankName}
                            />
                        </div>
                        <div>
                            <p>支付单类型</p>
                            <Input disabled
                                value={waybillDetail.payTypeName}
                            />
                        </div>
                        <div>
                            <p>持卡人</p>
                            <Input
                                onChange={onChangeBackCardName}
                                value={waybillDetail.bankCardHolder}
                            />
                        </div>
                        <div>
                            <p>开票状态</p>
                            <Input disabled
                                value={waybillDetail.makeInvoiceStatusName}
                            />
                        </div>
                        <div>
                            <p>实付运费</p>
                            <Input disabled
                                value={waybillDetail.realPayAmount}
                            />
                        </div>
                        {/* <Form
                            initialValues={waybillDetail}
                            layout={'inline'}
                            name='basic'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                colon={false}
                                label='支付时间'
                                name='payTime'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='银行卡号'
                                name='driverBankNo'
                            >
                                <Input onChange={onChangeBackCardNum} />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='支付单编号'
                                name='cashStatementSn'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='银行名称'
                                name='bankName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='支付单类型'
                                name='payTypeName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='持卡人'
                                name='bankCardHolder'
                            >
                                <Input onChange={onChangeBackCardName} />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='开票状态'
                                name='makeInvoiceStatusName'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label='实付运费'
                                name='realPayAmount'
                            >
                                <Input disabled />
                            </Form.Item>
                        </Form> */}
                    </div>

                </div>
            </Modal>
        </Fragment>
    )
}

const mapStateProps = (state) => {
    return {
        detailDialogStatus: state.waybillDetailDialogStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateProps, mapDispatchToProps)(DetailDialog)
