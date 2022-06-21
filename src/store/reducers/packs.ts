import { ResponseCardType } from "api/packs";
import { GlobalPackTypes, RequestStatusType } from "store/actions/types/types";
import { PACK_ACTIONS_CONST } from "store/actions/constants";

const initState = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  page: 1,
  pageCount: 5,
  minCardsCount: 0,
  maxCardsCount: 50,
  togglePacks: "all" as const,
  loading: "idle" as const,
}

type initStateType = {
  cardPacks: ResponseCardType[]
  cardPacksTotalCount: number,
  page: number,
  pageCount: number,
  minCardsCount: number,
  maxCardsCount: number,
  loading?: RequestStatusType

}

export const packs = (state: initStateType = initState, action: GlobalPackTypes): initStateType => {
  switch (action.type) {
    case PACK_ACTIONS_CONST.SET_PACK:
      return {...state, ...action.payload}
    case PACK_ACTIONS_CONST.SET_PACK_SETTINGS:
      return {...state, page: action.currentPage, pageCount: action.pageSize}
    case PACK_ACTIONS_CONST.SET_LOADING_STATUS:
      return {...state, loading: action.status}
    case PACK_ACTIONS_CONST.SET_FILTERS:
      return {...state, ...action.payload}
    default:
      return state

  }

}