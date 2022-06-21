import { RECOVER_PASS_ACTIONS_CONST } from "store/actions/constants";
import { GlobalRecoverPassTypes } from "store/actions/types/types";

const initState = {
    email:'',
    newPasswordStatus:'',
    isSendMessage:false,
    isLoading:false,
    error: ''
}

type initStateType = typeof initState

export const ForgotPassword = (state = initState, action:GlobalRecoverPassTypes):initStateType => {
    switch (action.type) {
        case RECOVER_PASS_ACTIONS_CONST.SET_LOADING:
            return  {...state, isLoading: action.loading}
        case RECOVER_PASS_ACTIONS_CONST.IS_SEND_RECOVER_MAIL:
            return {...state, isSendMessage: action.isSend, email: action.email}
        case RECOVER_PASS_ACTIONS_CONST.SET_ERROR:
            return{...state, error:action.msg}
        case RECOVER_PASS_ACTIONS_CONST.SHOW_RECOVER_STATUS:
            return  {...state, newPasswordStatus: action.msg}

        default:
            return state

    }

}

