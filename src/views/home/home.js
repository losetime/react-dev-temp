import React from 'react'
// import { Provider } from 'react-redux'
// import store from './store'
import '../../style/home/home.less'
import { HashRouter, Route } from 'react-router-dom' //可以选择BrowserRouter，history模式
import { secondRoutes } from '../../router/index'
import Header from './header'
import SideBar from './sidebar'

function Home() {
  /* exact的意思是完全匹配才渲染dom */
  return (
    <div className='home-wrapper'>
      <Header></Header>
      <div className='home-content-wrap'>
        <SideBar></SideBar>
        <HashRouter>
          <div className='router-view-wrap'>
            {
              secondRoutes.map((routeItem, key) => {
                if (routeItem.exact) {
                  return (
                    <Route exact
                        key={key}
                        path={routeItem.path}
                        render={props => (<routeItem.component {...props} />)}
                    ></Route>
                  )
                } else {
                  return (
                    <Route key={key}
                        path={routeItem.path}
                        render={props => (<routeItem.component {...props} />)}
                    ></Route>
                  )
                }
              })
            }
          </div>
        </HashRouter>
      </div>
    </div>
  )
}

export default Home
