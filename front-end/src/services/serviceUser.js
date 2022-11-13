import { axiosApiInstance } from '../http'

class Login {
  login(data = {}) {
    return axiosApiInstance.post('/session', data)
  }
  register(data = {}) {
    return http.post('/user', data)
  }
  checkerToken(data = {}) {
    return http.post('/checkerToken', data)
  }
}

export default new Login()
