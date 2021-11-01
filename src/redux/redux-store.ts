import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'

let rootReducer = combineReducers({
  profileData: profileReducer,
  dialogsData: dialogsReducer,
  sidebar: sidebarReducer,
  usersData: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never



export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> 

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
// @ts-ignore
window.__store__ = store
// let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
