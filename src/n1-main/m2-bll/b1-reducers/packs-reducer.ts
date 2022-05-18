import {packsAPI, ResponseCardType} from "../../m3-dal/packs-api";
import {AppRootStateType, AppThunk} from "../store";
import {RequestStatusType} from "./app-reducer";


export type CurrentTab = 'my' | 'all'

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    // количество колод
    minCardsCount: 0,
    maxCardsCount: 50,
    page: 1,
    pageCount: 5,
    togglePacks: "all" as const,
    loading: 'idle' as const
}
type initStateType = {
    cardPacks: ResponseCardType[]
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    togglePacks? : CurrentTab
    loading?: RequestStatusType

}



export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case 'pack/SET-CARD-PACK':
            return {...state, ...action.payload}
        case "pack/SET-CURRENT-TAB":
            return {...state, togglePacks: action.currentTab}
        case 'pack/SET-PAGE-SETTINGS':
            return {...state, page: action.currentPage, pageCount: action.pageSize}
        case 'pack/SET-LOADING-STATUS':
            return {...state, loading:action.status}
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
        page,
        pageCount
    }
        :initStateType) => {
    return {
        type: 'pack/SET-CARD-PACK', payload:{
            cardPacks,
            cardPacksTotalCount,
            maxCardsCount,
            page,
            pageCount,
        }
    } as const
}


export const pageChangingAC = (currentPage:number, pageSize:number) =>
    ({type:'pack/SET-PAGE-SETTINGS', currentPage, pageSize} as const)

export const setCurrentTabAC = (currentTab:CurrentTab) =>
    ({type:'pack/SET-CURRENT-TAB', currentTab} as const)

export const setLoadingPackAC = (status:RequestStatusType) =>
    ({type:'pack/SET-LOADING-STATUS', status} as const)


//thunk
// export const fetchPacksTC = (minCardsCount:number, maxCardsCount:number, searchText:string, userId:string):AppThunk =>
//     async (dispatch, getState: () => AppRootStateType) => {
//         dispatch(setLoadingPackAC('loading'))
//         const {pageCount, page} = getState().cardPacks
//         const dataQueryParams = {min:minCardsCount,
//             max:maxCardsCount, packName: searchText, pageCount, page, user_id:userId }
//         try {
//             const res = await packsAPI.getPacks(dataQueryParams)
//             dispatch(setCardPacksAC(res.data))
//         } catch (e) {
//             console.log(e)
//         }
//         finally {
//             dispatch(setLoadingPackAC('succeeded'))
//         }
//     }


export const fetchPacks = (min:number,max:number, currentPage:number, pageCount:number, userId:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        const res  = await packsAPI.getPacks({min:min, max:max, page:currentPage, pageCount:pageCount, user_id:userId})
        dispatch(setCardPacksAC(res.data))
        dispatch(setLoadingPackAC('succeeded'))
    }



export const deletePackTC = (packId:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        try {
            const {minCardsCount, maxCardsCount, togglePacks, page, pageCount} = getState().cardPacks
            const profileId = getState().profile.id
            await packsAPI.deletePack(packId)
            // check toggle position, if toggled "my" tab - do fetch with userID, if "all" - fetch '' instead userID
           if (togglePacks === 'my') {
               // dispatch(fetchMyTasks(minCardsCount, maxCardsCount, page, pageCount, profileId ))
           }
           if (togglePacks === 'all') {
               // dispatch(fetchAllTasks(minCardsCount, maxCardsCount, page, pageCount))
           }
        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingPackAC('succeeded'))
        }
    }

//types
type cardPackReducerTypes = ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof pageChangingAC>
    | ReturnType<typeof setCurrentTabAC>
    | ReturnType<typeof setLoadingPackAC>