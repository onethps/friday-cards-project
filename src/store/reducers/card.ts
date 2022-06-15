import { Dispatch } from "redux";
import { card, cardQueryParams } from "api/card";
import { GetCardsResponse, ResponseCardContent } from "types";
import { AppRootStateType } from "store/store";


export enum CARD_ACTIONS_TYPE {
    SET_CARDS = 'card/SET-CARDS',
    SET_CARD_STATUS = 'card/SET-CARD-STATUS',
    SET_NEW_CARD = 'card/SET-NEW-CARD'
}


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
    // количество колод
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    loading: boolean
    packUserId: string,

}

export const Card = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case CARD_ACTIONS_TYPE.SET_CARDS:
            return {...state, ...action.cards}
        case CARD_ACTIONS_TYPE.SET_CARD_STATUS:
            return {...state, loading: action.isLoading}
        case CARD_ACTIONS_TYPE.SET_NEW_CARD:
            return {...state, cards: [...action.newCard, ...state.cards]}
        default:
            return state
    }
}

//thunk
export const fetchCardsTC = (data: cardQueryParams) => (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    card.getCard(data).then((res) => {
        dispatch(setCardsAC(res.data))
    }).catch((err) => {
        console.log(err)
    })
      //stopping loading in any case
      .finally(() => {
          dispatch(isLoading(false))
      })
}

export const setNewCardTC = (data: ResponseCardContent) => async (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    try {
        const res = await card.setNewCard(data)
        dispatch(setNewCardAC(res.data))
    } catch (e) {
        throw new Error(e as any)
    } finally {
        dispatch(isLoading(false))
        dispatch(fetchCardsTC({cardsPack_id: data.cardsPack_id}) as any)
    }
}

export const deleteCardTC = (cardId: string, cardPackId: string) => async (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    try {
        await card.deleteCard(cardId)
    } catch (e) {
        throw new Error(e as any)
    } finally {
        dispatch(isLoading(false))
        dispatch(fetchCardsTC({cardsPack_id: cardPackId}) as any)
    }
}

export const saveEditCardTC = (data:any, cardPackId:string) => async (dispatch: Dispatch) => {
    dispatch(isLoading(true))
    try {
        await card.editCard(data)
    } catch (e) {
        throw new Error(e as any)
    } finally {
        dispatch(isLoading(false))
        dispatch(fetchCardsTC({cardsPack_id: cardPackId}) as any)
    }
}


//actions
export const setCardsAC = (cards: GetCardsResponse) => {
    return {type: CARD_ACTIONS_TYPE.SET_CARDS, cards} as const
}
export const isLoading = (isLoading: boolean) => {
    return {type: CARD_ACTIONS_TYPE.SET_CARD_STATUS, isLoading} as const
}

export const setNewCardAC = (newCard: ResponseCardContent) => {
    return {
        type: CARD_ACTIONS_TYPE.SET_NEW_CARD,
        newCard
    } as const
}


//types
type ActionsTypes = ReturnType<typeof setCardsAC>
  | ReturnType<typeof isLoading>
  | ReturnType<typeof setNewCardAC>
  | any


