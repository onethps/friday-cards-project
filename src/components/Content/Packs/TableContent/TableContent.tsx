import React, { ChangeEvent, FC, useState } from 'react';
import style from "./TableContent.module.scss";
import { Input, Pagination, Table } from "antd";
import { PackColumns } from "components/Content/Packs/TableContent/TablePackData";
import { cardPacksTotalCount, FormatedCardPackData, loading, selectCardPacks } from "store/selectors/selectCardPacks";
import AddPackModal from "components/Content/Packs/TableContent/TableModals/AddPackModal/AddPackModal";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "store/store";
import { PAGE_SIZES_OPTIONS } from "components/Content/Packs/enums";
import { setFilterAC } from "store/reducers/packs";


type TableContentType = {
  searchText: string
  setSearchText: (search: string) => void
  page:number
  pageCount:number
}

const TableContent: FC<TableContentType> = ({searchText, setSearchText, page, pageCount}) => {

  const dispatch = useAppDispatch();

  const cardPacks = useTypedSelector(selectCardPacks);
  const cardPacksTotal = useTypedSelector(cardPacksTotalCount);
  const loadingStatus = useTypedSelector(loading);


  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>): void => setSearchText(e.currentTarget.value);

  const [showAddPackModal, setShowAddPackModal] = useState<boolean>(false);


  return (
    <>
      <AddPackModal
        showAddModal={showAddPackModal}
        setShowAddModal={setShowAddPackModal}
      />

      <div className={style.rightSideContainer}>
        <h2 style={{textAlign: 'left'}}>Packs List</h2>
        <div className={style.searchBlock}>
          <Input
            value={searchText}
            onChange={onSearchInputHandler}
            placeholder="Search by Name..."
            className={style.inputSearch}
          />
          <button onClick={() => setShowAddPackModal(true)}>Add new pack</button>
        </div>
        <div className={style.tableBlock}>
          <div className={style.tableStyle}>
            <Table
              rowKey={record => record._id}
              loading={loadingStatus === 'loading'}
              style={{minWidth: '900px'}}
              columns={PackColumns}
              className={style.booking_information_table}
              dataSource={FormatedCardPackData(cardPacks)}
              pagination={false}
            />
          </div>
          <Pagination
            onChange={(paginatorPage, paginatorPageSize) => {
              dispatch(setFilterAC({page: paginatorPage, pageCount:paginatorPageSize}))
            }}
            current={page}
            showSizeChanger
            pageSizeOptions={[
              PAGE_SIZES_OPTIONS.FIVE_PACKS_PER_PAGE,
              PAGE_SIZES_OPTIONS.TEN_PACKS_PER_PAGE,
              PAGE_SIZES_OPTIONS.TWENTY_FIVE_PACKS_PER_PAGE,
            ]}
            pageSize={pageCount}
            total={cardPacksTotal}
          />
        </div>
      </div>
    </>
  );
};

export default TableContent;