import {instance} from "./auth-api";
import {GetCardsResponse} from "../../n2-features/f4-Card/card-reducer";


export const packsAPI = {
    getCardsList({...packParams}:cardPacksQueryParams) {
        return instance.get<ResponseCardPackType>('/cards/pack', {params: packParams})},

    addCardPack({...params}:addCardPackType) {
        return instance.post('/cards/pack', {cardsPack:{params}})
    },

    changeCardPack({...params}:changeCardPackType) {
        return instance.put('/cards/pack', {cardsPack:{_id:'617ff51fd7b1030004090a1f'}})
    },


}


type changeCardPackType = {
    _id:string
    name?: string
}

type addCardPackType ={
    name?: string
    deckCover?: string
    private?:boolean
}


type cardPacksQueryParams  = {
    packName?:string
    min?: number
    max?:number
    currentPage?: number
    packsPerPage?: number
    sortPacks?: string
    page?:number
    pageCount?:number
    user_id?:string
}


export type ResponseCardPackType = {
    cardPacks: ResponseCardType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    // количество элементов на странице
}


export type ResponseCardType = {
    _id:string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
}

