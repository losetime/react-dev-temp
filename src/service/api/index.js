import Operation from './operation'
import login from './login'

const modules = [login,Operation]
let API = {}

modules.forEach(item => {
  API = { ...API, ...item }
})

export default API
