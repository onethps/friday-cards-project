import {authAPI, ResponseError} from "../../../m3-dal/auth-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {actionTypeProfileReducer, setProfileInfo} from "../profile-reducer";
import {RequestStatusType} from "../app-reducer";
import {AppThunk} from "../../store";


export interface loginState {
    isLoggedIn: boolean
    loadingStatus: RequestStatusType
    error:string | null
}

export enum LoginActionEnum {
    SET_LOGGED_IN = "login/IS-LOGGED-IN",
    SET_LOADING_STATUS = "login/SET-LOADING-STATUS",
    SET_ERROR_MESSAGE = "login/ERROR-MESSAGE"
}


const initialState: loginState = {
    isLoggedIn: false,
    loadingStatus:'idle',
    error:null,

}
// reducers
export const loginReducer = (state: loginState = initialState, action: ActionsType): loginState => {
    switch (action.type) {
        case LoginActionEnum.SET_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        case LoginActionEnum.SET_LOADING_STATUS:
            return {...state, loadingStatus: action.status}
        case LoginActionEnum.SET_ERROR_MESSAGE:
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
            let {email, name, _id} = res.data
            dispatch(setProfileInfo(email, name, _id))
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