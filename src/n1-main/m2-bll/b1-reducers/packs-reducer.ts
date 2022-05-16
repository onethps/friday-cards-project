import {packsAPI, ResponseCardType} from "../../m3-dal/packs-api";
import {AppRootStateType, AppThunk} from "../store";

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}
type initStateType = {
    cardPacks: ResponseCardType[]
    cardPacksTotalCount: number,
    // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
}

export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case 'pack/SET-CARD-PACK':
            return {...state, ...action.payload}
        case 'pack/SET-PAGE-SETTINGS':
            return {...state, page: action.currentPage, pageCount: action.pageSize}
        default:
            return state

    }

}

//actions
export const setCardPacksAC = (
    {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount}:initStateType) => {
    return {
        type: 'pack/SET-CARD-PACK', payload:{
            cardPacks,
            cardPacksTotalCount,
            maxCardsCount,
            minCardsCount,
            page,
            pageCount,
        }
    } as const
}


export const pageChangingAC = (currentPage:number, pageSize:number) =>
    ({type:'pack/SET-PAGE-SETTINGS', currentPage, pageSize} as const)


//thunk
export const fetchPacksTC = (minCardsCount:number, maxCardsCount:number, searchPackName:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
   const {pageCount, page} = getState().cardPacks
    const dataQueryParams = {min:minCardsCount, max:maxCardsCount, packName: searchPackName, pageCount, page}
    const res = await packsAPI.getPacks(dataQueryParams)
    dispatch(setCardPacksAC(res.data))
}

//types
type cardPackReducerTypes = ReturnType<typeof setCardPacksAC> | ReturnType<typeof pageChangingAC>