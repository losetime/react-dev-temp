import React, { Fragment, useState } from 'react'
import $http from '@/service/http'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '@/store/actions'
import '@/style/operation/waybill.less'
import { Modal, Table, Input, message } from 'antd'
// import { waybillHead } from '../../assets/tableHead'

const PayAgainDialog = (props) => {
    const waybillHead = [
        {
            title: '运单编号',
            dataIndex: 'transportSn',
            key: 'transportSn'
        },
        {
            title: '运单创建企业',
            dataIndex: 'createCompany',
            key: 'createCompany'
        },
        {
            title: '车牌号',
            dataIndex: 'vehicleNo',
            key: 'vehicleNo'
        },
        {
            title: '司机姓名',
            key: 'driverName',
            dataIndex: 'driverName'
        },
        {
            title: '联系方式',
            key: 'driverTel',
            dataIndex: 'driverTel'
        },
        {
            title: '运单状态',
            key: 'transportStatus',
            dataIndex: 'transportStatus'
        },
        {
            title: '运价(元/吨)',
            key: 'freightCost',
            dataIndex: 'freightCost'
        },
        {
            title: '装货时间',
            key: 'upstreamLoadedA',
            dataIndex: 'upstreamLoadedA'
        },
        {
            title: '装货净重(吨)',
            key: 'upstreamRealTransportWeight',
            dataIndex: 'upstreamRealTransportWeight'
        },
        {
            title: '卸货时间',
            key: 'unloadLoadedAt',
            dataIndex: 'unloadLoadedAt'
        },
        {
            title: '货损(吨)',
            key: 'lossWeight',
            dataIndex: 'lossWeight'
        },
        {
            title: '允许货损(公斤/车)',
            key: 'allowLoss',
            dataIndex: 'allowLoss'
        },
        {
            title: '亏吨单价(元)',
            key: 'lossCost',
            dataIndex: 'lossCost'
        },
        {
            title: '应付运费(元)',
            key: 'freightPayAmount',
            dataIndex: 'freightPayAmount'
        },
        {
            title: '亏吨扣款(元)',
            key: 'lossDecreaseAmount',
            dataIndex: 'lossDecreaseAmount'
        },
        {
            title: '杂项(元)',
            key: 'miscellaneousExpenses',
            dataIndex: 'miscellaneousExpenses'
        },
        {
            title: '油费金额(元)',
            key: 'oilFeeAmount',
            dataIndex: 'oilFeeAmount'
        },
        {
            title: '计算运费(元)',
            key: 'freight',
            dataIndex: 'freight'
        },
        {
            title: '运单创建时间',
            key: 'createdAt',
            dataIndex: 'createdAt'
        },
        {
            title: '运单创建人',
            key: 'createUserName',
            dataIndex: 'createUserName'
        },
        {
            title: '支付状态',
            key: 'tradeStatusName',
            dataIndex: 'tradeStatusName'
        },
        {
            title: '支付单编号',
            key: 'cashStatementSn',
            dataIndex: 'cashStatementSn'
        },
        {
            title: '支付单类型',
            key: 'payTypeName',
            dataIndex: 'payTypeName'
        },
        {
            title: '支付时间',
            key: 'payTime',
            dataIndex: 'payTime'
        },
        {
            title: '开票状态',
            key: 'makeInvoiceStatusName',
            dataIndex: 'makeInvoiceStatusName'
        },
        {
            title: '运单来源',
            key: 'dataSourceName',
            dataIndex: 'dataSourceName'
        },
        {
            title: '装货企业',
            key: 'packCompany',
            dataIndex: 'packCompany'
        },
        {
            title: '卸货企业',
            key: 'unloadCompany',
            dataIndex: 'unloadCompany'
        },
        {
            title: '银行名称',
            key: 'bankName',
            dataIndex: 'bankName'
        },
        {
            title: '银行卡号',
            key: 'driverBankNo',
            dataIndex: 'driverBankNo'
        },
        {
            title: '银行持卡人',
            key: 'bankCardHolder',
            dataIndex: 'bankCardHolder'
        },
        {
            title: '身份证号',
            key: 'driverIdentityNo',
            dataIndex: 'driverIdentityNo'
        },
        {
            title: '实付运费',
            key: 'realPayAmount',
            dataIndex: 'realPayAmount'
        }
    ]

    const [payPassword, setPayPassword] = useState('')

    const handleCancel = () => {
        props.actions.setPayAgainDialogStatus(false)
    }

    const handleOk = () => {
        if (payPassword === '') {
            message.warn('密码不能为空！')
            return
        }
        $http.callSecondPay({
            transportId: props.currentRow.transportId,
            payPassword: payPassword,
            adminUserId: '12345678'
        }).then(res => {
            if (res.code === 0) {
                message.success('支付成功！')
                props.actions.setPayAgainDialogStatus(false)
            }
        })
    }

    const getPayPassword = (event) => {
        setPayPassword(event.target.value)
    }

    return (
        <Fragment>
            <Modal
                cancelText='取消'
                okText='确认'
                onCancel={handleCancel}
                onOk={handleOk}
                title='支付'
                visible={props.payAgainDialogStatus}
                width={1000}
            >
                <div className='pay-again-dialog-wrap'>
                    <div className='pay-title-wrap'>
                        <p>支付明细</p>
                        <p>说明：运费支付到银行卡将收取收款人手续费，不同银行手续费收取标准不同，具体以银行公示为准</p>
                    </div>
                    <div className='pay-table-wrap'>
                        <Table
                            columns={waybillHead}
                            dataSource={[props.currentRow]}
                            pagination={false}
                            scroll={{ x: 'max-content' }}
                            size='small'
                        />
                    </div>
                    <div className='pay-info-wrap'>
                        <span>交易合计笔数：{props.currentRow.payCount}</span>
                        <span>交易合计金额：{props.currentRow.realPayAmount}</span>
                        <span>付款方名称：{props.currentRow.createUserName}</span>
                    </div>
                    <div className='pay-password-wrap'>
                        <Input onChange={getPayPassword}
                            placeholder='请核对无误后，输入支付密码'
                        />
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

const mapStateProps = (state) => {
    return {
        payAgainDialogStatus: state.payAgainDialogStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateProps, mapDispatchToProps)(PayAgainDialog)
