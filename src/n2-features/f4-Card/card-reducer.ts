import {Dispatch} from "redux";
import {cardAPI, cardQueryParams} from "./card-api";
import {ResponseCardType} from "../../n1-main/m3-dal/packs-api";


const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0,
    packUserId: ''
    // количество элементов на странице
}

type InitialStateType = {
    cardPacks: ResponseCardContent[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    // количество элементов на странице

}

export const CardReducer = (state:InitialStateType = initialState, actions:ActionsTypes):InitialStateType => {
    switch (actions.type) {
        case "card/SET-CARDS":
            return {...state, cardPacks: actions.cards}
        default:
            return state
    }
}


export const fetchCardsTC = (data:cardQueryParams) => (dispatch:Dispatch) => {
    cardAPI.getCard(data).then((res) => {
        console.log(res)
        dispatch(setCardsAC(res.data.cards))
    })
}



export const setCardsAC = (cards:ResponseCardContent[]) => {
    return {type: 'card/SET-CARDS', cards} as const
}


type ActionsTypes = ReturnType<typeof setCardsAC>


export type GetCardsResponse =  {
    cards: ResponseCardContent[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}


export type ResponseCardContent = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}