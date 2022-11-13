import http from './http'
import type { Response, User, ResponseLogin, ReturnRgister, CheckToken } from '../types/services'

export const Login = async (data: User): Promise<ResponseLogin> => {
  return http.post('/session', data)
}

export const Register = async (data: User): Promise<ReturnRgister> => {
  return http.post('/user', data)
}

export const checkerToken = async (data: CheckToken): Promise<Response> => {
  return http.post('/checkerToken', data)
}

