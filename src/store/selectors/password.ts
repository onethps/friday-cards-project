import { AppRootStateType } from "store/store";

export const isLoadingForgotPassword = (state: AppRootStateType):boolean => state.forgotPassword.isLoading;
