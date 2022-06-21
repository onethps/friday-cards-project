import { GetCardsResponse, ResponseCardContent } from "types";
import { CARD_ACTIONS_CONST } from "store/actions/constants";



export const setCardsAC = (cards: GetCardsResponse) => {
  return {type: CARD_ACTIONS_CONST.SET_CARDS, cards} as const
}
export const isLoadingCard = (isLoading: boolean) => {
  return {type: CARD_ACTIONS_CONST.SET_CARD_STATUS, isLoading} as const
}

export const setNewCardAC = (newCard: ResponseCardContent) => {
  return {
    type: CARD_ACTIONS_CONST.SET_NEW_CARD, newCard} as const
}