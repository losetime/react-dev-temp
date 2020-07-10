import React from 'react'
import { Button } from 'antd'
import '../../style/home/homepage.less'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'

const HomePage = (props) => {
    return (
        <div className='homepage-wrapper'>
           <Button type='primary'>Primary Button</Button>
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

export default connect(mapStateProps, mapDispatchToProps)(HomePage)
