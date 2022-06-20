import { AxiosResponse } from 'axios';

import { LoginParamsType } from 'store/reducers/login';
import { instance } from 'services/api/config';

// d1-api
export const auth = {
  register(email: string, password: string) {
    return instance.post<AxiosResponse>('/auth/register', {email, password});
  },

  login(loginData: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('/auth/login', loginData,);
  },
  authMe() {
    return instance.post<ResponseType>('/auth/me', {});
  },

  changeProfileInfo(name: string, avatar:any) {
    return instance.put<ResponseType>('/auth/me', {name, avatar});
  },
  logout() {
    return instance.delete('/auth/me', {});
  },
  forgotPassword(email: string) {
    const data = {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px">
                      password recovery link: 
                        <a href='http://localhost:3000/#/new_pass/$token$'>
                          link
                        </a> 
                      </div>`,
    };
    return instance.post(`/auth/forgot`, data);
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<{ info: string }>('/auth/set-new-password', {password, resetPasswordToken,});
  },


};

export enum AUTH_RESPONSE_TYPE {
  REGISTER_SUCCESS = 'Created',
}

export type ResponseError = {
  error: string;
  email: string;
  in: string;
};

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
};
