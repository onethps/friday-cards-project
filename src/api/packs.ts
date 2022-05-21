import { instance } from 'services/api/config';

export const packs = {
  // done
  getPacks({ ...props }: cardPacksQueryParams) {
    return instance.get<ResponseCardPackType>('/cards/pack', { params: { ...props } });
  },

  // done
  addCardPack(packName: string) {
    return instance.post(`/cards/pack`, { cardsPack: { name: packName } });
  },

  // done
  deletePack(packId: string) {
    return instance.delete(`/cards/pack?id=${packId}`);
  },
  // done
  editPackName(id: string, name: string) {
    return instance.put(`/cards/pack`, { cardsPack: { _id: id, name } });
  },
};

// type changeCardPackType = {
//   _id: string;
//   name?: string;
// };
//
// type addCardPackType = {
//   name?: string;
//   deckCover?: string;
//   private?: boolean;
// };

type cardPacksQueryParams = {
  packName?: string;
  min?: number;
  max?: number;
  currentPage?: number;
  packsPerPage?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type ResponseCardPackType = {
  cardPacks: ResponseCardType[];
  cardPacksTotalCount: number;
  // количество колод
  maxCardsCount: number;
  minCardsCount: number;
  page: number; // выбранная страница
  pageCount: number;
  // количество элементов на странице
};

export type ResponseCardType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};
