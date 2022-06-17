import { instance } from 'services/api/config';
import { GetCardsResponse, ResponseCardContent } from "types";
import { AxiosResponse } from "axios";

export const card = {
  getCard(data: cardQueryParams) {
    return instance.get<GetCardsResponse>('/cards/card', {params: data});
  },
  setNewCard(data: ResponseCardContent) {
    return instance.post<ResponseCardContent>('/cards/card', {card: data});
  },
  editCard(data: ResponseCardContent) {
    return instance.put<ResponseCardContent>('/cards/card', {card: data});
  },
  deleteCard(cardId: string) {
    return instance.delete<ResponseCardContent>('/cards/card', {
      params: {
        id: cardId
      }
    });
  },
  updateGrade(grade:number, cardId:string) {
    return instance.put<{updatedGrade: updatedGrade}>('/cards/grade', {grade: grade, card_id: cardId})
     }

};

export type cardQueryParams = {
  cardAnswer?: string; // не обязательно
  cardQuestion?: string; // не обязательно
  cardsPack_id: string | undefined;
  min?: number; // не обязательно
  maxL?: number; // не обязательно
  sortCards?: string; // не обязательно
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
};


export type updatedGrade = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}