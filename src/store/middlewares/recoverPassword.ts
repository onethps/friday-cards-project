import { Dispatch } from "redux";
import {
  ErrorRecoverDMessageAC,
  isLoadingRecoverAC,
  isSendMessageAC,
  setNewPasswordStatus
} from "store/actions/recoverPassword";
import { auth } from "api/auth";

export const forgotPasswordTC = (email:string) => (dispatch:Dispatch) => {
  dispatch(isLoadingRecoverAC(true))
  auth.forgotPassword(email).then(()=> {
    dispatch(isSendMessageAC(email ,true))
  }).catch((error) => {
    let err = error.response.data.error
    dispatch(ErrorRecoverDMessageAC(''))
    dispatch(ErrorRecoverDMessageAC(err))
  }).finally(() => {
    dispatch(isLoadingRecoverAC(false))
  })
}



export const setNewPasswordTC = (pas:string, token:string) => (dispatch:Dispatch) => {
  dispatch(isLoadingRecoverAC(true))
  auth.setNewPassword(pas, token)
    .then((res) => {
      dispatch(setNewPasswordStatus(res.data.info))
    })
    .catch((e) => e.response.data.error ? console.log(e.response.data.error) : console.log(e))
    .finally(() => {
      dispatch(isLoadingRecoverAC(false))
    })
}