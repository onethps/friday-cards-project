import { AppThunk } from "store/store";
import { Dispatch } from "redux";
import { GlobalLoginTypes, GlobalProfileTypes, LoginParamsType } from "store/actions/types/types";
import { errorLoginMessage, isLoggedInAC, setLoadingStatusAC } from "store/actions/auth";
import { auth } from "api/auth";
import { setProfileInfoAC } from "store/actions/profile";

export const loginTC = (loginData: LoginParamsType): AppThunk => async (dispatch: Dispatch<GlobalLoginTypes | GlobalProfileTypes>) => {
  dispatch(setLoadingStatusAC('loading'));
  try {
    const res  =   await auth.login(loginData)
    dispatch(isLoggedInAC(true));
    const { email, name, _id, avatar } = res.data;
    dispatch(setProfileInfoAC(email, name, _id, avatar!));
  } catch (error: any) {
    dispatch(errorLoginMessage(
        error.response?.data ? error.response.data.error : error.message,
      ),
    );
  } finally {
    dispatch(setLoadingStatusAC('succeeded'));
  }
};


export const logoutTC = () => {
  return (dispatch: Dispatch) => {
    auth.logout().then(() => {
      dispatch(setProfileInfoAC( '', '', '', ''))
      dispatch(isLoggedInAC(false))
    })
  }
}

