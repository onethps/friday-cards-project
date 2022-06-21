import { AppThunk } from "store/store";
import { changeMessageStatusAC, setLoadingProfileStatusAC } from "store/actions/profile";
import { auth } from "api/auth";
import { initializeAppTC } from "store/middlewares/initialaizeApp";

export const changeProfileInfoTC = (name:string, avatar:any): AppThunk => {
  return async dispatch => {
    dispatch(setLoadingProfileStatusAC('loading'))
    try {
      const res = await auth.changeProfileInfo(name, avatar)
      dispatch(initializeAppTC() as any)
      dispatch(changeMessageStatusAC('Info successfully changed'))
      dispatch(setLoadingProfileStatusAC('idle'))
    } catch (e) {
      throw new Error (e as any)
    }
  }
}