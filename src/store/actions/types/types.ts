import { isLoadingCard, setCardsAC, setNewCardAC } from "store/actions/card";
import { isInitializedAppAC, setAppErrorAC, setAppStatusAC } from "store/actions/app";
import { pageChangingAC, setCardPacksAC, setFilterAC, setLoadingPackAC } from "store/actions/packs";
import {
  ErrorRecoverDMessageAC,
  isLoadingRecoverAC,
  isSendMessageAC,
  setNewPasswordStatus
} from "store/actions/recoverPassword";
import { errorLoginMessage, isLoggedInAC, setLoadingStatusAC } from "store/actions/auth";
import { changeMessageStatusAC, setLoadingProfileStatusAC, setProfileInfoAC } from "store/actions/profile";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type GlobalAppTypes =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof isInitializedAppAC>
  | any;


export type GlobalCardTypes = ReturnType<typeof setCardsAC>
  | ReturnType<typeof isLoadingCard>
  | ReturnType<typeof setNewCardAC>
  | any


export type GlobalPackTypes = ReturnType<typeof setCardPacksAC>
  | ReturnType<typeof pageChangingAC>
  | ReturnType<typeof setLoadingPackAC>
  | ReturnType<typeof setFilterAC>


export type GlobalRecoverPassTypes = ReturnType<typeof ErrorRecoverDMessageAC>
  | ReturnType<typeof isLoadingRecoverAC>
  | ReturnType<typeof isSendMessageAC>
  | ReturnType<typeof setNewPasswordStatus>


export type GlobalLoginTypes =
  | ReturnType<typeof isLoggedInAC>
  | ReturnType<typeof errorLoginMessage>
  | ReturnType<typeof setLoadingStatusAC>;

export type GlobalProfileTypes = ReturnType<typeof setProfileInfoAC>
  | ReturnType<typeof setLoadingProfileStatusAC>
  | ReturnType<typeof changeMessageStatusAC>