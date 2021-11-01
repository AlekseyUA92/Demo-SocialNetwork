import {  ResultCodeEnum } from '../api/api'
import { FormAction, stopSubmit } from 'redux-form'

import { PhotosType, PostType, ProfileType } from '../types/types'
import {  BaseThunkType, InferActionsType } from './redux-store'
import { profileAPI } from '../api/profile_api'


let initialState = {
  posts: [
    { id: 1, message: 'Hello, how are you?', likesCount: 10 },
    { id: 2, message: 'This is my first post!', likesCount: 15 },
    { id: 3, message: 'Do you Dima?', likesCount: 20 },
    { id: 4, message: 'Yes I very do!!!', likesCount: 30 },
    { id: 5, message: 'Dont repeat my name son, please.' },
    { id: 6, message: 'In the far far Kingdom...' }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '' ,
  //newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD-POST':
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        //newPostText: ''
      }

    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      }

    case 'SET_USER_STATUS':
      return {
        ...state,
        status: action.status
      }

    case 'DELETE_POST':
      return {
        ...state,
        posts: [...state.posts.filter((p) => p.id !== action.postId)]
      }

    case 'SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }

    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: 'ADD-POST',
    newPostText
  } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: 'SET_USER_PROFILE',
    profile
  } as const),
  setUserStatus: (status: string) => ({
    type: 'SET_USER_STATUS',
    status: status
  } as const),
  deletePost: (postId: number) => ({
    type: 'DELETE_POST',
    postId
  } as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: 'SAVE_PHOTO_SUCCESS',
    photos
  } as const)
}

// ======= THUNKs=======
export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch, getState) => {
  try {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setUserStatus(data))
  } catch (error) {
    console.log('Error from auth-reducer: ', error)
  }
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setUserStatus(status))
    }
  } catch (error) {
    //debugger
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file)
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  let data = await profileAPI.saveProfile(profile)

  if (data.resultCode === ResultCodeEnum.Success) {
    if (userId !== null) {
      dispatch(getUserProfile(userId))
    } else {
      throw new Error(`userId can't be null!`)
    }
  } else {
    dispatch(
      stopSubmit('edit-profile', {
        _error: data.messages[0]
      })
    )
    return Promise.reject(data.messages[0])
  }
}
// ошибка на определенном поле
//stopSubmit('edit-profile', {
//   'contacts': { 'facebook': response.data.messages[0] }
// })
export default profileReducer

// ---------- TYPES ----------
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

//type GetStateType = () => AppStateType
//type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>