import { usersAPI } from '../api/users_api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/object-helpers'
import { BaseThunkType, InferActionsType } from './redux-store'
import {Dispatch} from 'redux'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: true,
  followingInProgress: [] as Array<number> // array of users id
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'social-network/users/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true
        })
      }
    case 'social-network/users/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false
        })
      }
    case 'social-network/users/SET_USERS': {
      return { ...state, users: action.users }
    }
    case 'social-network/users/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'social-network/users/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count }
    }
    case 'social-network/users/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId)
      }
    }
    default:
      return state
  }
}


export const actions = {
  followSuccess: (userId: number) => ({ 
    type: 'social-network/users/FOLLOW', 
    userId 
  } as const),
  unfollowSuccess: (userId: number) => ({ 
    type: 'social-network/users/UNFOLLOW', 
    userId 
  } as const),
  setUsers: (users: Array<UserType>) => ({ 
    type: 'social-network/users/SET_USERS', 
    users 
  } as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'social-network/users/SET_CURRENT_PAGE',
    currentPage: currentPage
  } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'social-network/users/SET_TOTAL_USERS_COUNT',
    count: totalUsersCount
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'social-network/users/TOGGLE_IS_FETCHING',
    isFetching: isFetching
  } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching: isFetching,
    userId
  } as const)
}

// ==== THUNKs ====
export const recieveUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let data = await apiMethod(userId)

  if (data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    let actionCreator = actions.followSuccess
    _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowUser.bind(usersAPI),
      actions.unfollowSuccess
    )
  }
}
// ==== /THUNKs ====

export default usersReducer

// ---------- TYPES ----------
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
