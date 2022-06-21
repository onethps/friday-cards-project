import { AppRootStateType } from "store/store";
import { ResponseCardType } from "api/packs";
import { RequestStatusType } from "store/actions/types/types";


export const selectCardPacks = (state: AppRootStateType): ResponseCardType[] => state.packs.cardPacks;
export const cardPacksTotalCount = (state: AppRootStateType): number => state.packs.cardPacksTotalCount;
export const loadingPackStatus = (state: AppRootStateType): RequestStatusType | undefined => state.packs.loading;

