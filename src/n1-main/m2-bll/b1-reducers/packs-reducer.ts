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
    togglePacks: "all" as const
}
type initStateType = {
    cardPacks: ResponseCardType[]
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    togglePacks? : currentTab

}

export type currentTab = 'my' | 'all'

export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case 'pack/SET-CARD-PACK':
            return {...state, ...action.payload}
        case "pack/SET-CURRENT-TAB":
            return {...state, togglePacks: action.currentTab}
        case 'pack/SET-PAGE-SETTINGS':
            return {...state, page: action.currentPage, pageCount: action.pageSize}
        default:
            return state

    }

}

//actions
export const setCardPacksAC = (
    {
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount
    }
        :initStateType) => {
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

export const setCurrentTabAC = (currentTab:currentTab) =>
    ({type:'pack/SET-CURRENT-TAB', currentTab} as const)


//thunk
export const fetchPacksTC = (minCardsCount:number, maxCardsCount:number, searchText:string, userID:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const {pageCount, page} = getState().cardPacks
        const dataQueryParams = {min:minCardsCount,
            max:maxCardsCount, packName: searchText, pageCount, page, user_id: userID ? userID : '' }
        const res = await packsAPI.getPacks(dataQueryParams)
        dispatch(setCardPacksAC(res.data))
    }


export const deletePackTC = (packId:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const {minCardsCount, maxCardsCount, togglePacks} = getState().cardPacks
            const profileId = getState().profile.id
            await packsAPI.deletePack(packId)
            // check toggle position, if toggled "my" tab - do fetch with userID, if "all" - fetch '' instead userID
            const userID = togglePacks === 'my' ? profileId : ''
            dispatch(fetchPacksTC(minCardsCount, maxCardsCount, '', userID))
        } catch (e) {
            console.log(e)
        }
    }

//types
type cardPackReducerTypes = ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof pageChangingAC>
    | ReturnType<typeof setCurrentTabAC>