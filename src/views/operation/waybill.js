import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import { bindActionCreators } from 'redux'
import $http from '@/service/http'
import '../../style/operation/waybill.less'
import { Input, Select, Button, Table,Pagination } from 'antd'
import DetailDialog from '@/components/waybill/detailDialog'
import PayAgainDialog from '@/components/waybill/payAgainDialog'
import { waybillHead } from '../../assets/tableHead'

const Waybill = (props) => {
    const { Option } = Select
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


    const [searchParams, setSearchParams] = useState({
        transportNo: 'aaa',
        vehicleNo: '',
        nameOrTel: '',
        transportStatus: '',
        payStatus: '',
        makeInvoiceStatus: ''
    })
    const [tableData, setTableData] = useState([])
    const [currentRow, setCurrentRow] = useState({})
    const [waybillDetail, setWaybillDetail] = useState({})
    const [searchOptions, setSearchOptions] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [totle, setTotle] = useState(0)

    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${totle}条`,
        pageSize: 20,
        current: currentPage,
        total: totle,
        onChange: (current) => onPagination(current)
    }
    useEffect(() => {
        getWaybillTableData({})
        getSearchOptions()
    }, [])

    // 获取表格数据
    const getWaybillTableData = (params) => {
        params.pageNum = currentPage
        params.perPage = 20
        $http.getWaybillTableData(params).then(res => {
            console.log(456, res)
            if (res.code === 0) {
                let result = res.data
                setTotle(result.count)
                setTableData(result.listData)
            }
        }, [])
    }

    const getSearchOptions = () => {
        $http.getSearchOption({
            enumByParams: ['makeInvoiceStatus', 'payStatus', 'transportStatus']
        }).then(res => {
            if (res.code === 0) {
                let result = res.data
                setSearchOptions(result)
            }
        })
    }

    const onTableRowEvent = (row) => {
        console.log('row', row)
        setCurrentRow(row)
    }

    // 列表查询
    const onSearchBtn = () => {
        getWaybillTableData(searchParams)
    }

    const seachHandleChange = (value, type) => {
        let params = searchParams
        searchParams[type] = value
        setSearchParams(params)
    }

    // 查看详情
    const onWaybillDetail = () => {
        getDetailData()
    }

    // 重新支付
    const onPayagain = () => {
        props.actions.setPayAgainDialogStatus(true)
    }

    // 刷新
    const onRefresh = () => {
        getWaybillTableData({})
    }

    // 获取详情
    const getDetailData = () => {
        $http.getWaybillDetail({ transportId: currentRow.transportId }).then(res => {
            console.log('详情')
            if (res.code === 0) {
                props.actions.setWaybillDetailDialogStatus(true)
                let result = res.data
                setWaybillDetail(result)
            }
        })
    }

    const onPagination = (page, pageSize) => {
        setCurrentPage(page)
        getWaybillTableData({})
    }

    return (
        <div className='waybill-wrapper'>
            <div className='search-handle-wrap'>
                <Input className='search-input'
                    onChange={(event) => seachHandleChange(event.target.value, 'transportNo')}
                    placeholder='运单号/支付单编号/支付明细编号'
                />
                <Input className='search-input'
                    onChange={(event) => seachHandleChange(event.target.value, 'vehicleNo')}
                    placeholder='车牌号'
                />
                <Input className='search-input'
                    onChange={(event) => seachHandleChange(event.target.value, 'nameOrTel')}
                    placeholder='司机姓名/联系方式'
                />
                <Select
                    className='search-input'
                    defaultValue={[]}
                    mode='multiple'
                    onChange={(value) => seachHandleChange(value, 'transportStatus')}
                    placeholder='运单状态(可多选)'
                >
                    {searchOptions.transportStatus ? searchOptions.transportStatus.map((val) => <Option key={val.label}>{val.text}</Option>) : []}
                </Select>
                <Select
                    className='search-input'
                    defaultValue={[]}
                    mode='multiple'
                    onChange={(value) => seachHandleChange(value, 'payStatus')}
                    placeholder='支付状态(可多选)'
                >
                    {searchOptions.payStatus ? searchOptions.payStatus.map((val) => <Option key={val.label}>{val.text}</Option>) : []}
                </Select>
                <Select
                    className='search-input'
                    onChange={(value) => seachHandleChange(value, 'makeInvoiceStatus')}
                    placeholder='开票状态'
                >
                    {searchOptions.makeInvoiceStatus ? searchOptions.makeInvoiceStatus.map((val) => <Option key={val.label}>{val.text}</Option>) : []}
                </Select>
                <Button
                    className='search-btn'
                    onClick={() => onSearchBtn()}
                    shape='round'
                    type='primary'
                >
                    查询
                </Button>
            </div>

            <div className='table-wrap'>
                <div className='handle-wrap'>
                    <div className='handle-left-wrap'>
                        <Button
                            className='search-btn'
                            onClick={onWaybillDetail}
                            shape='round'
                            type='primary'
                        >
                            查看
                        </Button>
                        <Button
                            className='search-btn'
                            onClick={onPayagain}
                            shape='round'
                            type='primary'
                        >
                            重新支付
                        </Button>
                    </div>
                    <Button
                        className='search-btn'
                        onClick={onRefresh}
                        shape='round'
                        type='primary'
                    >
                        刷新
                    </Button>
                </div>
                <div className='table-content-wrap'>
                    <Table
                        columns={waybillHead}
                        dataSource={tableData}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    onTableRowEvent(record)
                                }
                            }
                        }
                        }
                        pagination={paginationProps}
                        scroll={{ x: 5000, y:550 }}
                        size='small'
                    />
                </div>
            </div>

            <DetailDialog waybillDetail={waybillDetail}></DetailDialog>

            <PayAgainDialog currentRow={currentRow}></PayAgainDialog>
        </div>
    )
}

const mapStateProps = (state) => {
    return {
        userName: state.userName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Waybill)
