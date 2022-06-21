import { ResponseCardType } from 'api/packs';




const toLocaleTimeConverter = (time: string): string =>
  new Date(time).toLocaleDateString('ru-RU');

export const FormattedCardPackData = (arr: ResponseCardType[]): ResponseCardType[] =>
  arr.map(cardPack => ({
    ...cardPack,
    updated: toLocaleTimeConverter(cardPack.updated),
  }));
