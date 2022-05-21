import { ResponseCardType } from 'api/packs';
import { RequestStatusType } from 'store/reducers/app';
import { AppRootStateType } from 'store/store';

export const selectCardPacks = (state: AppRootStateType): ResponseCardType[] =>
  state.cardPacks.cardPacks;

export const cardPacksTotalCount = (state: AppRootStateType): number =>
  state.cardPacks.cardPacksTotalCount;

export const togglePacks = (state: AppRootStateType): string | undefined =>
  state.cardPacks.togglePacks;

export const loading = (state: AppRootStateType): RequestStatusType | undefined =>
  state.cardPacks.loading;

export const page = (state: AppRootStateType): number => state.cardPacks.page;
export const pageCount = (state: AppRootStateType): number => state.cardPacks.pageCount;

const GMTToCISTimeZone = (time: string): string =>
  new Date(time).toLocaleDateString('ru-RU');

export const FormatedCardPackData = (arr: ResponseCardType[]): ResponseCardType[] =>
  arr.map(cardPack => ({
    ...cardPack,
    updated: GMTToCISTimeZone(cardPack.updated),
  }));
