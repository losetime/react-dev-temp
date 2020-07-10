import React from 'react'
import '../../style/home/header.less'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

const Login = () => {
    return (
        <div className='header-wrapper'>
            <div className='logo-wrap'></div>
            <div className='info-wrap'>
                <div className='current-router-wrap'>首页</div>
                <div className='user-wrap'>
                    <div className='user-name-wrap'>
                        <UserOutlined />
                        <p>刘金贵</p>
                    </div>
                    <div className='quite-wrap'>
                        <LogoutOutlined />
                        <p>退出</p>
                    </div>
                </div>
            </div>
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

export default connect(mapStateProps, mapDispatchToProps)(Login)
