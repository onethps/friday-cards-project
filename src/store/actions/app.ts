import { RequestStatusType } from "store/actions/types/types";
import { APP_ACTIONS_CONST } from "store/actions/constants";


export const setAppStatusAC = (status: RequestStatusType) =>
  ({type: APP_ACTIONS_CONST.SET_APP_STATUS, status} as const);

export const isInitializedAppAC = (isInitialized: boolean) =>
  ({type: APP_ACTIONS_CONST.INITIALIZE_APP, isInitialized} as const);

export const setAppErrorAC = (error: string) =>
  ({type: APP_ACTIONS_CONST.SET_ERROR, error} as const);