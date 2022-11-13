import http from './http'
import type { ResponseUrl, UrlPost, returnPostUrl, UrlUser } from '../types/services'

export const GetAllUrls = async (): Promise<ResponseUrl> => {
  return http.get('/urlGetAll')
}

export const PostUrl = async (data: UrlPost): Promise<returnPostUrl> => {
  return http.post('/url', data)
}

export const DeleteUrl = async (data: string): Promise<ResponseUrl> => {
  return http.delete('/deleteUrl' + data)
}

export const GetUserUrl = async (data: string): Promise<ResponseUrl> => {
  return http.get('/urlUser/' + data)
}
