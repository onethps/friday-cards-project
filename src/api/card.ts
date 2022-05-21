import { GetCardsResponse } from 'store/reducers/card';

import { instance } from 'services/api/config';

export const card = {
  getCard({ ...packParams }: cardQueryParams) {
    return instance.get<GetCardsResponse>('/cards/card', { params: packParams });
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
