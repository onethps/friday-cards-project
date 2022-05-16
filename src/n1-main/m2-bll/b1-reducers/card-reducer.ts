import {Dispatch} from "redux";
import {cardAPI, cardQueryParams} from "../../m3-dal/card-api";
import {RequestStatusType} from "./app-reducer";


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

}

export const CardReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case "card/SET-CARDS":
            return {...state,  ...action.cards}
        case "card/SET-CARD-STATUS":
            return {...state, loading: action.isLoading}
        default:
            return state
    }
}

//thunk
export const fetchCardsTC = (data:cardQueryParams) => (dispatch:Dispatch) => {
    dispatch(isLoading(true))
    cardAPI.getCard(data).then((res) => {
        dispatch(setCardsAC(res.data))

    }).catch((err) => {
        console.log(err)
    })
        //stopping loading in any case
        .finally(() => {
        dispatch(isLoading(false))
    })
}



export const setCardsAC = (cards:GetCardsResponse) => {
    return {type: 'card/SET-CARDS', cards} as const
}


export const isLoading = (isLoading:boolean) => {
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