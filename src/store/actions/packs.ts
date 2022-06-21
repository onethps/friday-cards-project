import { PACK_ACTIONS_CONST } from "store/actions/constants";
import { RequestStatusType } from "store/actions/types/types";

export const pageChangingAC = (currentPage: number, pageSize: number) =>
  ({type: PACK_ACTIONS_CONST.SET_PACK_SETTINGS, currentPage, pageSize} as const)

export const setLoadingPackAC = (status: RequestStatusType) =>
  ({type: PACK_ACTIONS_CONST.SET_LOADING_STATUS, status} as const)

export const setFilterAC = (filters: any) =>
  ({
    type: PACK_ACTIONS_CONST.SET_FILTERS,
    payload: {
      ...filters,
    }
  } as const)

export const setCardPacksAC = (
  {
    cardPacks,
    cardPacksTotalCount,
    page,
    pageCount
  }
    : any) => {
  return {
    type: PACK_ACTIONS_CONST.SET_PACK, payload: {
      cardPacks,
      cardPacksTotalCount,
      page,
      pageCount,
    }
  } as const
}
