import {authAPI} from "../../m3-dal/auth-api";
import {Dispatch} from "redux";

const initState = {
    email:'',
    newPasswordStatus:'',
    isSendMessage:false,
    isLoading:false,
    error: ''
}

type initStateType = typeof initState

export const ForgotPasswordReducer = (state = initState, action:forgotPasswordReducerTypes):initStateType => {
    switch (action.type) {
        case "forgotReducer/isLoading":
            return  {...state, isLoading: action.loading}
        case "forgotReducer/isSendMessage":
            return {...state, isSendMessage: action.isSend, email: action.email}
        case "forgotReducer/ErrorMessage":
            return{...state, error:action.msg}
        case "forgotReducer/newPasswordStatus":
            return  {...state, newPasswordStatus: action.msg}

        default:
            return state

    }

}



export const forgotPasswordTC = (email:string) => (dispatch:Dispatch) => {
    dispatch(isLoadingAC(true))
    authAPI.forgotPassword(email).then(()=> {
        dispatch(isSendMessageAC(email ,true))
    }).catch((error) => {
        let err = error.response.data.error
        dispatch(ErrorDMessageAC(''))
        dispatch(ErrorDMessageAC(err))
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}



//thunk
export const senNewPasswordTC = (pas:string, token:string) => (dispatch:Dispatch) => {
    dispatch(isLoadingAC(true))
    authAPI.setNewPassword(pas, token)
        .then((res) => {
            dispatch(SetNewPasswordStatusAC(res.data.info))
        })
        .catch((e) => e.response.data.error ? console.log(e.response.data.error) : console.log(e))
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}


//actions
const ErrorDMessageAC = (msg:string) => ({type: 'forgotReducer/ErrorMessage', msg} as const)

const isLoadingAC = (loading:boolean) => ({type: 'forgotReducer/isLoading', loading} as const)

const isSendMessageAC = (email:string,isSend:boolean) =>
    ({type: 'forgotReducer/isSendMessage', email, isSend} as const)

const SetNewPasswordStatusAC = (msg:string) => ({type: 'forgotReducer/newPasswordStatus',msg} as const)

type forgotPasswordReducerTypes = ReturnType<typeof ErrorDMessageAC>
    | ReturnType<typeof isLoadingAC>
    | ReturnType<typeof isSendMessageAC>
    | ReturnType<typeof SetNewPasswordStatusAC>