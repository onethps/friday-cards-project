import {instance} from "../../n1-main/m3-dal/auth-api";
import {ResponseCardPackType} from "../../n1-main/m3-dal/packs-api";
import {GetCardsResponse} from "./card-reducer";


export const cardAPI = {
    getCard({...packParams}:cardQueryParams) {
        return instance.get<GetCardsResponse>('/cards/card', {params: packParams})
    },
}


export type cardQueryParams = {
    cardAnswer?:string // не обязательно
    cardQuestion?:string // не обязательно
    cardsPack_id: string
    min?:number // не обязательно
    maxL?:number // не обязательно
    sortCards?:string // не обязательно
    page?:number // не обязательно
    pageCount?:number // не обязательно
}

