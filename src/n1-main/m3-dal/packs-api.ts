import {instance} from "./auth-api";


export const packsAPI = {
    getPacks({...props}:cardPacksQueryParams) {
        return instance.get<ResponseCardPackType>('/cards/pack',
            {params: {...props} })},

    addCardPack() {
        return instance.post(`/cards/pack`, {cardsPack: {}})
    },

    deletePack(packId:string) {
        return instance.delete(`/cards/pack?id=${packId}`)
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

