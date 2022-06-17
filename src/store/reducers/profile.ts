import {Dispatch} from "redux";
import {auth} from "api/auth";
import {isLoggedInAC} from "store/reducers/login";

const initialState = {
    id:'',
    email: '',
    name:'',
    error: null,
    status: 'idle',
    changeMessageStatus: ''
}

type InitialStateType = typeof initialState

export const profile = (state: InitialStateType = initialState, action:actionTypeProfileReducer) => {
    switch (action.type) {
        case "profile/SET-PROFILE-INFO":
            return {...state, name: action.name, email: action.email, id: action.id}
        case "profile/SET-LOADING-STATUS":
            return {...state, status: action.status}
        case "profile/SET-CHANGE-MESSAGE-STATUS":
            return {...state, changeMessageStatus: action.status}
        default:
            return state
    }

}


//thunk
export const changeProfileInfoTC = (name:string) => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingStatus('loading'))
        auth.changeProfileInfo(name)
            .then(() => {
            dispatch(changeMessageStatusAC('Name successfully changed'))
        })
            .catch((e) => {
                throw new Error (e as any)
            })
            .finally(() => {
                dispatch(setLoadingStatus('idle'))
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        auth.logout().then(() => {
            dispatch(setProfileInfo( '', '', ''))
            dispatch(isLoggedInAC(false))
        })
    }
}


//actions
export const setProfileInfo = (email:string, name:string, id:string) => ({type: 'profile/SET-PROFILE-INFO', email, name, id} as const)

export const setLoadingStatus = (status:string) => ({type: 'profile/SET-LOADING-STATUS', status} as const)

export const changeMessageStatusAC = (status:string) => ({type: 'profile/SET-CHANGE-MESSAGE-STATUS', status} as const)

//types
export type actionTypeProfileReducer = ReturnType<typeof setProfileInfo>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof changeMessageStatusAC>