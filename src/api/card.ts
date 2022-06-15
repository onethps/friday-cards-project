import { instance } from 'services/api/config';
import { GetCardsResponse, ResponseCardContent } from "types";

export const card = {
  getCard({...packParams}: cardQueryParams) {
    return instance.get<GetCardsResponse>('/cards/card', {params: packParams});
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
