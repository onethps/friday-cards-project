import { ResponseCardContent } from "types";
import { GlobalCardTypes } from "store/actions/types/types";
import { CARD_ACTIONS_CONST } from "store/actions/constants";

const initialState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    loading: false
}

type InitialStateType = {
    cards: ResponseCardContent[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    loading: boolean
    packUserId: string,

}

export const card = (state: InitialStateType = initialState, action: GlobalCardTypes): InitialStateType => {
    switch (action.type) {
        case CARD_ACTIONS_CONST.SET_CARDS:
            return {...state, ...action.cards}
        case CARD_ACTIONS_CONST.SET_CARD_STATUS:
            return {...state, loading: action.isLoading}
        case CARD_ACTIONS_CONST.SET_NEW_CARD:
            return {...state, cards: [...action.newCard, ...state.cards]}
        default:
            return state
    }
}