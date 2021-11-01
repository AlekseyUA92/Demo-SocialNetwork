import { ResultCodeEnum, ResultCodeForCaptcha } from '../api/api'
import { authAPI } from '../api/auth_api'
import { securityAPI } from '../api/security_api'
import { BaseThunkType, InferActionsType } from './redux-store'
import { FormAction, stopSubmit } from 'redux-form';

let initialState = {
  userId: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null // if null, captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'social-network/auth/SET_USERS_DATA':
    case 'social-network/security/GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'social-network/auth/SET_USERS_DATA',
    payload: { userId, email, login, isAuth }
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'social-network/security/GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl }
  } as const)
}

// ==== Thunks ====
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me()

  if (response.resultCode === ResultCodeEnum.Success) {
    let { id, login, email } = response.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | any): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      let message =
        loginData.messages.length > 0
          ? loginData.messages[0]
          : 'Some error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  }

export const logout = (): ThunkType => async (dispatch) => {
  let logoutData = await authAPI.logout()
  if (logoutData.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const captchaData = await securityAPI.getCaptchaURL()
  const captchaUrl = captchaData.url

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

// ---------- TYPES ----------
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

//type GetStateType = () => AppStateType
//type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes | FormAction> // FormAction from redux-form