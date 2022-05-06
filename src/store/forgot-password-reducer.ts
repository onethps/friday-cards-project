import {authAPI} from "../api/api";
import {Dispatch} from "redux";

const initState = {
    error: ''
}

type initStateType = typeof initState

export const ForgotPasswordReducer = (state = initState, action:forgotPasswordReducerTypes):initStateType => {
    switch (action.type) {
        case "forgotReducer/ErrorMessage":
            return{
                ...state,
                error:action.msg
            }

        default:
            return state

    }

}



export const forgotPasswordTC = (email:string) => (dispatch:Dispatch) => {
    authAPI.forgotPassword(email).then((res)=> {
        console.log(res)
    }).catch((error) => {
        let err = error.response.data.error
        dispatch(ErrorDMessageAC(''))
        dispatch(ErrorDMessageAC(err))
    })
}

const ErrorDMessageAC = (msg:string) => {
    return {
        type: 'forgotReducer/ErrorMessage', msg
    } as const
}

type forgotPasswordReducerTypes = ReturnType<typeof ErrorDMessageAC>