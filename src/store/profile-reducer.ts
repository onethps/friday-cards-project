import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {isLoggedInAC} from "./login-reducer";

const initialState = {
    email: '',
    name:'',
    error: null,
    status: 'idle'
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action:actionTypeProfileReducer) => {
    switch (action.type) {
        case "profile/SET-PROFILE-INFO":
            return {...state, name: action.name, email: action.email}
        case "profile/SET-LOADING-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }

}


//thunk

// export const authMe = () => {
//     return (dispatch: Dispatch) => {
//         authAPI.getProfile().then((res) => {
//             if (res.status === 200) {
//
//                 dispatch(isLoggedInAC(true))
//                 dispatch(setProfileInfo(res.data.name, res.data.email))
//             }
//         })
//
//     }
// }


export const changeProfileInfoTC = (name:string) => {
    return (dispatch: Dispatch) => {
        authAPI.changeProfileInfo(name).then(() => {
        })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout().then((res) => {
            dispatch(setProfileInfo( '', ''))
            dispatch(isLoggedInAC(false))
        })
    }
}


//actions
export const setProfileInfo = (email:string, name:string) => ({type: 'profile/SET-PROFILE-INFO', email, name} as const)

export const setLoadingStatus = (status:string) => ({type: 'profile/SET-LOADING-STATUS', status} as const)


//types
export type actionTypeProfileReducer =
    ReturnType<typeof setProfileInfo>
    | ReturnType<typeof setLoadingStatus>