import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route} from 'react-router-dom'
import routes from './router/index'

function App() {
  /* exact的意思是完全匹配才渲染dom */
  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {
              routes.map((routeItem, key) => {
                if (routeItem.exact) {
                  return (
                    <Route key={key} path={routeItem.path} exact render={props => (<routeItem.component {...props} />)}></Route>
                  )
                } else {
                  return (
                    <Route key={key} path={routeItem.path} render={props => (<routeItem.component {...props} />)}></Route>
                  )
                }
              })
            }
          </div>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
