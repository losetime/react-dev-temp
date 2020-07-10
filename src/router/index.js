import Login from '../views/login/index'
import Home from '../views/home/home'
import HomePage from '../views/home/homePage'
import Waybill from '../views/operation/waybill'

export const firstRoutes = [
    // 登录
    { path: '/login', name: '登录', component: Login, exact: true },
    // 首页
    { path: '/home', name: '首页', component: Home}
]


export const secondRoutes = [
    // 后台首页
    { path: '/home/HomePage', name: '后台首页', component: HomePage, exact: true },
    // 运单管理
    { path: '/home/waybill', name: '运单管理', component: Waybill, exact: true }
]
