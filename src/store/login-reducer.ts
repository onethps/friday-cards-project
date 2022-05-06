import {authAPI, ResponseError} from "../api/api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {actionTypeProfileReducer, setProfileInfo} from "./profile-reducer";
import {RequestStatusType} from "./app-reducer";
import {AppThunk} from "./store";


type InitialStateType = {
    isLoggedIn: boolean
    loadingStatus: RequestStatusType
    error:string | null
}

const initialState: InitialStateType = {
    isLoggedIn: false,
    loadingStatus:'idle',
    error:null

}
// reducers
export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case "login/SET-LOADING-STATUS":
            return {...state, loadingStatus: action.status}
        case 'login/ERROR-MESSAGE':
            return {...state, error: action.message}
        default:
            return state
    }
}

// actions
export const isLoggedInAC = (isLoggedIn:boolean) => (
    {type: 'login/IS-LOGGED-IN', isLoggedIn
    } as const)

export const errorLoginMessage = (message:string) => {return {type: 'login/ERROR-MESSAGE', message} as const}
export const setLoadingStatusAC = (status:RequestStatusType) => {return {type: 'login/SET-LOADING-STATUS', status} as const}



// thunks
export const loginTC = (loginData: LoginParamsType): AppThunk => {
    return   (dispatch: Dispatch<ActionsType | actionTypeProfileReducer>) => {
        dispatch(setLoadingStatusAC('loading'))
        authAPI.login(loginData).then( (res) => {
            dispatch(isLoggedInAC(true))
            let {email, name} = res.data
            dispatch(setProfileInfo(email, name))
        }).catch((error:AxiosError<ResponseError>) => {
            dispatch(errorLoginMessage(error.response?.data ? error.response.data.error: error.message))
        }).finally( () => {
                dispatch(setLoadingStatusAC('succeeded'))
            }

        )
    }
}



// types
type ActionsType =
    | ReturnType<typeof isLoggedInAC>
    | ReturnType<typeof errorLoginMessage>
    | ReturnType<typeof setLoadingStatusAC>


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}