//import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './auth-reducer'
import { AppStateType, InferActionsType } from './redux-store'

let initialState = {
  initialized: false,
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state
  }
}

const actions = {
  initializedSuccess: () => ({
    type: 'SN/APP/INITIALIZED_SUCCESS'
  } as const)
}

// ==== Thunk ====
//type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
  let promise = dispatch(getAuthUserData())
  //dispatch(somethingElse())
  //debugger
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer
