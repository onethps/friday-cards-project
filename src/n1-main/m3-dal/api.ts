import axios, {AxiosResponse} from "axios"
import {LoginParamsType} from "../m2-bll/b1-reducers/login-reducer";
import {forgotPasswordTC} from "../m2-bll/b1-reducers/forgot-password-reducer";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})



//d1-api
export const authAPI = {
    register(email:string, password:string) {
        return instance.post<AxiosResponse>('auth/register', {email, password} )
    },

    login(loginData: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', loginData);
    },
    getProfile() {
        return instance.post<ResponseType>('/auth/me', {});
    },
    changeProfileInfo(name:string) {
        return instance.put<ResponseType>('/auth/me', {name});
    },
    logout() {
        return instance.delete('/auth/me', {})
    },
    forgotPassword(email: string) {
        return instance.post('auth/forgot',
            {
                email: email,
                from: 'onethps@yandex.ru',
                message: `<div style="background-color: #FFC300; padding: 30px; border-radius: 20px">
										<p>Please, click on the link and enter a new password</p>
										<a href='http://localhost:3000/#/set-new-password/$token$'>Go to recovery password</a>
									</div>
									`
            })
    }


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

