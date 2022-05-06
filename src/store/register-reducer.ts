import {authAPI, RESPONSE_TYPE, ResponseError} from "../api/api";
import {AxiosError} from "axios";
import {AppDispatch} from "./store";


const initialState = {
    isRegistered:false,
    errorMessage:'',
    isFetchingLoader: false
}

type InitialStateType = typeof initialState


export const registerReducer = (state:InitialStateType = initialState, action:actionTypeRegistrationReducer):InitialStateType => {

    switch (action.type) {
        case 'register/IS-REGISTERED':
            return {...state, isRegistered: action.status}

        case 'register/ERROR-MESSAGE':
            return {...state, errorMessage: action.message}

        case "register/IS-FETCHING-STATUS":
            return {...state, isFetchingLoader: action.loading}
        default:
            return state
    }

}


//actions
const setIsRegistered = (status:boolean) => {return {type: 'register/IS-REGISTERED', status} as const}

const getErrorMessage = (message:string) => {return {type: 'register/ERROR-MESSAGE', message} as const}

const isFetchingLoader = (loading:boolean) => {return {type: 'register/IS-FETCHING-STATUS', loading} as const}



//thunk
export const registerTC = (email:string, password:string) => {
    return   (dispatch: AppDispatch) => {
        // clean past errors and turn on preloader
        dispatch(getErrorMessage(''))
        dispatch(isFetchingLoader(true))
        authAPI.register(email, password).then((res) => {
            if (res.statusText === RESPONSE_TYPE.REGISTER_SUCCESS) {
                dispatch(setIsRegistered(true))
                dispatch(isFetchingLoader(false))
            }
        }).catch((error:AxiosError<ResponseError>) => {
            dispatch(getErrorMessage(error.response?.data ? error.response.data.error: error.message))
            dispatch(setIsRegistered(false))
            dispatch(isFetchingLoader(false))

        })

    }
}

//types
export type actionTypeRegistrationReducer = ReturnType<typeof setIsRegistered>
    | ReturnType<typeof getErrorMessage>
    | ReturnType<typeof isFetchingLoader>






