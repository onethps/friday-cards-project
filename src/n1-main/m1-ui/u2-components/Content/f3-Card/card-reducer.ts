import {Dispatch} from "redux";
import {cardAPI, cardQueryParams} from "./card-api";
import {RequestStatusType} from "../../../../m2-bll/b1-reducers/app-reducer";


const initialState = {
    // cardName:'',
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    loading: false
}

type InitialStateType = {
    cardPacks: ResponseCardContent[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    loading: boolean

}

export const CardReducer = (state:InitialStateType = initialState, actions:ActionsTypes):InitialStateType => {
    switch (actions.type) {
        case "card/SET-CARDS":
            return {...state, cardPacks: actions.cards}
        case "card/SET-CARD-STATUS":
            return {...state, loading: actions.isLoading}
        default:
            return state
    }
}


export const fetchCardsTC = (data:cardQueryParams) => (dispatch:Dispatch) => {
    dispatch(isLoading(true))
    cardAPI.getCard(data).then((res) => {
        dispatch(setCardsAC(res.data.cards))

    }).catch((err) => {
        console.log(err)
    })


        .finally(() => {
        dispatch(isLoading(false))
    })
}



export const setCardsAC = (cards:ResponseCardContent[]) => {
    return {type: 'card/SET-CARDS', cards} as const
}


const isLoading = (isLoading:boolean) => {
    return {type: 'card/SET-CARD-STATUS', isLoading} as const
}


type ActionsTypes = ReturnType<typeof setCardsAC> | ReturnType<typeof isLoading>


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