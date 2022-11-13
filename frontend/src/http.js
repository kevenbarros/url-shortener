import axios from 'axios';
export const corsHeaders = {
  Accept: 'application/json, application/pdf, application/octet-stream',
  'Content-Type': 'application/json'
}
export const baseURL = 'http://localhost:5000/'
export const axiosApiInstance = axios.create({ baseURL, headers: { ...corsHeaders } });

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem('token')

    return config;
  },
  (error) => {
    const erro = error
    erro.response.body = error.response.error
    delete erro.response.error

    return erro
  });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const config = error.config

  if (error.response && error.response.status === 401 && !config._retry) {
    config._retry = true

    try {
      const token = sessionStorage.getItem('token')



      if (token) {
        http.defaults.headers.common['token'] = token
        return http(config)
      }

      return Promise.reject(error)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const erroData = error?.response?.data?.err
    ? error.response.data.err
    : error?.response?.data?.data

  return {
    data: {
      success: false,
      data: erroData
    }
  }
});
