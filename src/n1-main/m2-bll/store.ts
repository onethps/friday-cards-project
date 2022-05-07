import {applyMiddleware, combineReducers, createStore} from "redux";
import {actionTypeRegistrationReducer, registerReducer} from "./b1-reducers/register-reducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import {loginReducer} from "./b1-reducers/login-reducer";
import {profileReducer} from "./b1-reducers/profile-reducer";
import {appReducer} from "./b1-reducers/app-reducer";
import {ForgotPasswordReducer} from "./b1-reducers/forgot-password-reducer";

const rootReducer  = combineReducers( {
    app:appReducer,
    register: registerReducer,
    login: loginReducer,
    profile: profileReducer,
    forgotPassword: ForgotPasswordReducer
})



export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = actionTypeRegistrationReducer


export type AppThunk<ReturnType=void>=ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;