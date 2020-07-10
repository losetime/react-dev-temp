import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import '../../style/login/index.less'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'

const Login = (props) => {

    // const [account,setAccount] = useState('')

    useEffect(() => {
        getToken()
    }, [])

    const getToken = () => {
        React.$http.getData2().then(res => {
            console.log(res, 'res')
        })
    }

    return (
        <div className='title-wrap'>
            <p>用户名: {props.userName}</p>
            <Button onClick={() => props.actions.setUserName('李花花')}
                type='primary'
            >测试antd</Button>
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
