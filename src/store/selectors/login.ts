import { AppRootStateType } from "store/store";
import {  } from "store/reducers/app";
import { RequestStatusType } from "store/actions/types/types";

export const isLoggedInStatus = (state: AppRootStateType):boolean => state.login.isLoggedIn;
export const errorLogin = (state: AppRootStateType):string | null => state.login.error;
export const loadingLoginStatus = (state: AppRootStateType):RequestStatusType => state.login.loadingStatus;