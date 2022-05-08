import axios, {AxiosResponse} from "axios"
import {LoginParamsType} from "../m2-bll/b1-reducers/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})



//d1-api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<AxiosResponse>('/auth/register', {email, password} )
    },

    login(loginData: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', loginData);
    },
    authMe() {
        return instance.post<ResponseType>('/auth/me', {});
    },
    changeProfileInfo(name:string) {
        return instance.put<ResponseType>('/auth/me', {name});
    },
    logout() {
        return instance.delete('/auth/me', {})
    },
    forgotPassword(email: string) {
        const data = {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                      password recovery link: 
                        <a href='http://localhost:3000/#/set-new-password/$token$'>
                          link
                        </a> 
                      </div>`,
        }
        return instance.post(`/auth/forgot`, data);
    }


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


export const cardsAPI = {
    getCardsList({...carPackQuerys}:cardPacksQueryParams) {
        return instance.get<ResponseCardPackType>('/cards/pack', {params: carPackQuerys})}
}

export enum RESPONSE_TYPE {
    REGISTER_SUCCESS = 'Created',
}

export type ResponseError = {
    error:string
    email:string
    in:string
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
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


// export type UserCardType = {
//
//     _id: string
//     productName:string
//     price: number
//     productType: string
//     rating: number
//     created: string
//     updated: string
//     __v: number
//     id: string
//
// }




