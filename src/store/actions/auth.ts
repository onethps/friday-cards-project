import { RequestStatusType } from "store/actions/types/types";
import { LOGIN_ACTION_CONST } from "store/actions/constants";

export const isLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: LOGIN_ACTION_CONST.SET_LOGGED_IN, isLoggedIn } as const);

export const errorLoginMessage = (message: string) =>
  ({ type: LOGIN_ACTION_CONST.SET_ERROR_MESSAGE, message } as const);

export const setLoadingStatusAC = (status: RequestStatusType) =>
  ({ type: LOGIN_ACTION_CONST.SET_LOADING_STATUS, status } as const);