import { PROFILE_ACTION_CONST } from "store/actions/constants";

export const setProfileInfoAC = (email:string, name:string, id:string, avatar:string) =>
  ({type: PROFILE_ACTION_CONST.SET_PROFILE_INFO, email, name, id, avatar} as const)

export const setLoadingProfileStatusAC = (status:string) =>
  ({type: PROFILE_ACTION_CONST.SET_LOADING_STATUS, status} as const)

export const changeMessageStatusAC = (status:string) =>
  ({type: PROFILE_ACTION_CONST.SET_MSG_STATUS, status} as const)