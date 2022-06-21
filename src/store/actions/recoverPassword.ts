import { RECOVER_PASS_ACTIONS_CONST } from "store/actions/constants";

export const ErrorRecoverDMessageAC = (msg:string) => ({type: RECOVER_PASS_ACTIONS_CONST.SET_ERROR, msg} as const)

export const isLoadingRecoverAC = (loading:boolean) => ({type: RECOVER_PASS_ACTIONS_CONST.SET_LOADING, loading} as const)

export const isSendMessageAC = (email:string,isSend:boolean) =>
  ({type: RECOVER_PASS_ACTIONS_CONST.IS_SEND_RECOVER_MAIL, email, isSend} as const)

export const setNewPasswordStatus = (msg:string) => ({type: RECOVER_PASS_ACTIONS_CONST.SHOW_RECOVER_STATUS,msg} as const)