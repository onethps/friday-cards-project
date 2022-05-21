import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { Input, Pagination, Slider, Table } from 'antd';

import Header from 'components/Header/Header';

import AddPackModal from 'components/Content/f2-Packs/ModalContainer/AddPackModal/AddPackModal';
import l from 'components/Content/f2-Packs/Pack.module.scss';
import 'antd/dist/antd.min.css';
import { PackColumns } from 'components/Content/f2-Packs/PackData';

import {
  fetchPacks,
  pageChangingAC,
  setCurrentTabAC,
} from 'store/reducers/packs';
import {
  cardPacksTotalCount,
  loading,
  page,
  pageCount,
  selectCardPacks,
  togglePacks,
} from 'store/selectors';
import { FormatedCardPackData } from 'store/selectors/selectCardPacks';
import { useAppDispatch } from 'store/store';
import { useTypedSelector } from 'hooks/useTypedSelector';

export enum PACK_INIT_NUMBERS {
  DEFAULT_SLIDER_MIN_NUMBER = 0,
  DEFAULT_SLIDER_MAX_NUMBER = 50,
  FIRST_INDEX_FROM_SLIDER_ARRAY = 0,
  SECOND_INDEX_FROM_SLIDER_ARRAY = 1,
  ONE_TIMEOUT_SECOND = 1000,
  CURRENT_PAGE = 1,
}

export enum PAGE_SIZES_OPTIONS {
  FIVE_PACKS_PER_PAGE = 5,
  TEN_PACKS_PER_PAGE = 10,
  TWENTY_FIVE_PACKS_PER_PAGE = 25,
}

const Packs = (): ReactElement => {
  const dispatch = useAppDispatch();

  const cardPacks = useTypedSelector(selectCardPacks);
  const cardPacksTotal = useTypedSelector(cardPacksTotalCount);
  const toggleCurrentPack = useTypedSelector(togglePacks);

  const loadingStatus = useTypedSelector(loading);

  const currentPage = useTypedSelector(page);
  const packsOnOnePage = useTypedSelector(pageCount);

  // gets myID from Profile
  const { id } = useTypedSelector(state => state.profile);

  // sets settings on double slider
  const [minMax, setMinMax] = useState<number[]>([
    PACK_INIT_NUMBERS.DEFAULT_SLIDER_MIN_NUMBER,
    PACK_INIT_NUMBERS.DEFAULT_SLIDER_MAX_NUMBER,
  ]);

  // Input search State
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    // delay search on 1 second after stop typing in input search
    const delayDebounceFn = setTimeout(() => {
      const getPacks = async (): Promise<void> => {
        // if toggled "My" - fetching userID from Profile, if "All" - fetching '' instead id
        if (toggleCurrentPack === 'my') {
          // always back on first page, coz on others pages search result not shows
          await dispatch(
            fetchPacks(
              minMax[PACK_INIT_NUMBERS.FIRST_INDEX_FROM_SLIDER_ARRAY],
              minMax[PACK_INIT_NUMBERS.SECOND_INDEX_FROM_SLIDER_ARRAY],
              currentPage,
              packsOnOnePage,
              id,
            ),
          );
        }
        if (toggleCurrentPack === 'all') {
          await dispatch(
            fetchPacks(
              minMax[PACK_INIT_NUMBERS.FIRST_INDEX_FROM_SLIDER_ARRAY],
              minMax[PACK_INIT_NUMBERS.SECOND_INDEX_FROM_SLIDER_ARRAY],
              currentPage,
              packsOnOnePage,
              '',
            ),
          );
        }
      };
      getPacks();
    }, PACK_INIT_NUMBERS.ONE_TIMEOUT_SECOND);

    return () => clearTimeout(delayDebounceFn);
  }, [togglePacks, page, pageCount, minMax]);

  // settings of DoubleSlider
  const onChangeMinMaxSliderValue = (sliderValues: number[]): void =>
    setMinMax(sliderValues);

  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearchText(e.currentTarget.value);

  // toggl "my" and "all" tabs
  const setAllPacks = (): void => {
    dispatch(setCurrentTabAC('all'));
  };

  const setMyPacks = (): void => {
    dispatch(setCurrentTabAC('my'));
    dispatch(pageChangingAC(PACK_INIT_NUMBERS.CURRENT_PAGE, packsOnOnePage));
  };

  const [showAddPackModal, setShowAddPackModal] = useState<boolean>(false);

  return (
    <div>
      <nav>
        <Header />
      </nav>

      <AddPackModal
        showAddModal={showAddPackModal}
        setShowAddModal={setShowAddPackModal}
      />

      <div className={l.modalBox}>
        <div className={l.leftSideContainer}>
          <div className={l.leftSideContentBox}>
            <h3>Show packs cards</h3>
            <div className={l.buttonGroup}>
              <button
                onClick={setMyPacks}
                className={
                  toggleCurrentPack === 'my'
                    ? `${l.tabButton} ${l.active}`
                    : `${l.tabButton}`
                }
              >
                My
              </button>
              <button
                onClick={setAllPacks}
                className={
                  toggleCurrentPack === 'all'
                    ? `${l.tabButton} ${l.active}`
                    : `${l.tabButton}`
                }
              >
                All
              </button>
            </div>

            <h3>Number of cards</h3>
            <div>
              <Slider
                className={l.sliderStyle}
                onChange={onChangeMinMaxSliderValue}
                range
                defaultValue={[
                  minMax[PACK_INIT_NUMBERS.FIRST_INDEX_FROM_SLIDER_ARRAY],
                  minMax[PACK_INIT_NUMBERS.SECOND_INDEX_FROM_SLIDER_ARRAY],
                ]}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <div className={l.rightSideContainer}>
          <h2 style={{ textAlign: 'left' }}>Packs List</h2>
          <div className={l.searchBlock}>
            <Input
              value={searchText}
              onChange={onSearchInputHandler}
              placeholder="Search by Name..."
              className={l.inputSearch}
            />
            <button onClick={() => setShowAddPackModal(true)}>Add new pack</button>
          </div>
          <div className={l.tableBlock}>
            <div className={l.tableStyle}>
              <Table
                loading={loadingStatus === 'loading'}
                style={{ minWidth: '900px' }}
                columns={PackColumns}
                className={l.booking_information_table}
                dataSource={FormatedCardPackData(cardPacks)}
                pagination={false}
              />
            </div>
            <Pagination
              onChange={(paginatorPage, paginatorPageSize) => {
                dispatch(pageChangingAC(paginatorPage, paginatorPageSize));
              }}
              current={currentPage}
              showSizeChanger
              pageSizeOptions={[
                PAGE_SIZES_OPTIONS.FIVE_PACKS_PER_PAGE,
                PAGE_SIZES_OPTIONS.TEN_PACKS_PER_PAGE,
                PAGE_SIZES_OPTIONS.TWENTY_FIVE_PACKS_PER_PAGE,
              ]}
              pageSize={packsOnOnePage}
              total={cardPacksTotal}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packs;
