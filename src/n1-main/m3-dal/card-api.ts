import {instance} from "./auth-api";
import {GetCardsResponse} from "../m2-bll/b1-reducers/card-reducer";

export const cardAPI = {
    getCard({...packParams}:cardQueryParams) {
        return instance.get<GetCardsResponse>('/cards/card', {params: packParams})
    },
}


export type cardQueryParams = {
    cardAnswer?:string // не обязательно
    cardQuestion?:string // не обязательно
    cardsPack_id: string | undefined
    min?:number // не обязательно
    maxL?:number // не обязательно
    sortCards?:string // не обязательно
    page?:number // не обязательно
    pageCount?:number // не обязательно
}

