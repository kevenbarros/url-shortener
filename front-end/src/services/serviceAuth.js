import axios from 'axios'
import http, { baseURL } from '../http'

class AuthenticateService {
  login(data) {
    return http.post('/session', data).then((response) => {
      if (response.status == 200) {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('userId', response.data.person._id)
        sessionStorage.setItem('userEmail', response.data.person.email)
      }
      return response
    })
  }

  async refreshToken(data) {
    const response = isProd
      ? await http.post('/auth/token', data)
      : await axios.post('/auth/token', data, { baseURL })

    if (response.data.success) {
      const admin = await httpRawV4.get(
        `/admin/${response.data.data.account_id}`,
        {
          headers: {
            Authorization: response.data.data.token,
            'x-account-id': response.data.data.account_id
          }
        }
      )

      localStorage.setItem(
        'user',
        JSON.stringify({
          account: admin.data.data,
          ...response.data.data
        })
      )
    }

    return response
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthenticateService()
