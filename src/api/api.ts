import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    // 'API-KEY':
    // 'b523ace8-8079-455e-b7c7-0a9f0946e6bf'
    'API-KEY': '16ed8655-3ae7-4450-b649-ace997347a05'
  }
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}