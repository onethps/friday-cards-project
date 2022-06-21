import { AppRootStateType, AppThunk } from "store/store";
import { setCardPacksAC, setLoadingPackAC } from "store/actions/packs";
import { packs } from "api/packs";


export const fetchPacksTC = (min: number, max: number, currentPage: number, pageCount: number, packName: string, userId:string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      const res = await packs.getPacks(
        {
          min: min,
          max: max,
          page: currentPage,
          pageCount: pageCount,
          packName: packName,
          user_id: userId
        })
      dispatch(setCardPacksAC(res.data))
    } catch (e) {
      throw new Error(e as any)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }

  }

export const deletePackTC = (packId: string, category: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      await packs.deletePack(packId)
      const {minCardsCount, maxCardsCount, page, pageCount} = getState().cardPacks
      const profileId = getState().profile.id
      const fetchCategoryPacks = category === 'my' ? profileId : ''
      dispatch(fetchPacksTC(+minCardsCount, +maxCardsCount, page, pageCount, '', fetchCategoryPacks))
    } catch (e) {
      throw new Error (e as any)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }
  }


export const addNewPackTC = (packName: string, category:string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    const {minCardsCount, maxCardsCount, page, pageCount} = getState().cardPacks
    const {id} = getState().profile
    const fetchCategoryPacks = category === 'my' ? id : ''
    try {
      await packs.addCardPack(packName)
      dispatch(fetchPacksTC(+minCardsCount, +maxCardsCount, page, pageCount, '', fetchCategoryPacks))
      dispatch(setLoadingPackAC('succeeded'))
    } catch (e) {
      throw new Error (e as any)
    }
  }


export const editPackNameTC = (id: string, name: string, category: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      await packs.editPackName(id, name)
      const {minCardsCount, maxCardsCount, page, pageCount} = getState().cardPacks
      const profileId = getState().profile.id
      const fetchCategoryPacks = category === 'my' ? profileId : ''
      dispatch(fetchPacksTC(+minCardsCount, +maxCardsCount, page, pageCount, '', fetchCategoryPacks))
    } catch (e) {
      throw new Error (e as any)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }
  }
