import { Dispatch } from "redux";
import { GlobalAppTypes } from "store/actions/types/types";
import { auth, ResponseError } from "api/auth";
import { isInitializedAppAC, setAppErrorAC, setAppStatusAC } from "store/actions/app";
import { AxiosError } from "axios";
import { isLoggedInAC } from "store/actions/auth";
import { setProfileInfoAC } from "store/actions/profile";

export const initializeAppTC = () => async (dispatch: Dispatch<GlobalAppTypes>) => {
  try {
    const res = await auth.authMe()
    dispatch(isInitializedAppAC(true));
    dispatch(isLoggedInAC(true));
    const {email, name, _id, avatar} = res.data;
    dispatch(setProfileInfoAC(email, name, _id, avatar!));
  } catch (error: AxiosError<ResponseError> | any) {
    dispatch(
      setAppErrorAC(error.response?.data ? error.response.data.error : error.message),
    );
  } finally {
    dispatch(setAppStatusAC('succeeded'));
  }
};