import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import '../../style/home/sidebar.less'
import { Menu, Button } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'

const SideBar = () => {
    const [openKeys, setOpenKeys] = useState(['sub1'])
    const { SubMenu } = Menu
    let rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeys)
        } else {
            openKeys = latestOpenKey ? [latestOpenKey] : []
        }
        setOpenKeys(openKeys)
    }

    return (
        <div className='sidebar-wrapper'>
            <Menu
                mode='inline'
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                style={{ width: 240}}
            >
                <SubMenu
                    key='sub1'
                    title={
                        <span>
                            <MailOutlined />
                            <span>后台首页</span>
                        </span>
                    }
                >
                    <Menu.Item key='1'>Option 1</Menu.Item>
                    <Menu.Item key='2'>Option 2</Menu.Item>
                    <Menu.Item key='3'>Option 3</Menu.Item>
                    <Menu.Item key='4'>Option 4</Menu.Item>
                </SubMenu>
                <SubMenu icon={<AppstoreOutlined />}
                    key='sub2'
                    title='信息管理'
                >
                    <Menu.Item key='5'>Option 5</Menu.Item>
                    <Menu.Item key='6'>Option 6</Menu.Item>
                    <SubMenu key='sub3'
                        title='Submenu'
                    >
                        <Menu.Item key='7'>Option 7</Menu.Item>
                        <Menu.Item key='8'>Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu icon={<SettingOutlined />}
                    key='sub4'
                    title='财务管理'
                >
                    <Menu.Item key='9'>Option 9</Menu.Item>
                    <Menu.Item key='10'>Option 10</Menu.Item>
                    <Menu.Item key='11'>Option 11</Menu.Item>
                    <Menu.Item key='12'>Option 12</Menu.Item>
                </SubMenu>
            </Menu>
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

export default connect(mapStateProps, mapDispatchToProps)(SideBar)
