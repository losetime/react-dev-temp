import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter, Route } from 'react-router-dom' //可以选择BrowserRouter，history模式
import { firstRoutes } from './router/index'

function App() {
  /* exact的意思是完全匹配才渲染dom */
  return (
    <Fragment>
      <Provider store={store}>
          <HashRouter>
            <div className='app-wrapper'>
              {
                firstRoutes.map((routeItem, key) => {
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
      </Provider>
    </Fragment>
  )
}

export default App
