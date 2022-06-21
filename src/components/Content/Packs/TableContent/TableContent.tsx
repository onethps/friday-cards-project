import React, { ChangeEvent, FC, useState } from 'react';
import style from "./TableContent.module.scss";
import { Input, Pagination, Table } from "antd";
import { PackColumns } from "./TablePackData";
import { FormattedCardPackData } from "store/selectors/selectCardPacks";
import AddPackModal from "./TableModals/AddPackModal/AddPackModal";
import { useTypedSelector } from "hooks/useTypedSelector";
import { PAGE_SIZES_OPTIONS } from "components/Content/Packs/enums";
import { cardPacksTotalCount, loadingPackStatus, selectCardPacks } from "store/selectors";

type TableContentType = {
  searchText: string
  setSearchText: (search: string) => void
  page: number
  pageCount: number
  onPaginatorChange?: (page:any, pageCount:any) => void
  showAddNewPackButton?: boolean
}

const TableContent: FC<TableContentType> = ({searchText, setSearchText, page, pageCount, onPaginatorChange, showAddNewPackButton}) => {

  const cardPacks = useTypedSelector(selectCardPacks);
  const cardPacksTotal = useTypedSelector(cardPacksTotalCount);
  const loadingStatus = useTypedSelector(loadingPackStatus);

  const [showAddPackModal, setShowAddPackModal] = useState<boolean>(false);

  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value)
  };

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
          { showAddNewPackButton && <button onClick={() => setShowAddPackModal(true)}>Add new pack</button>}
        </div>
        <div className={style.tableBlock}>
          <div className={style.tableStyle}>
            <Table
              rowKey={record => record._id + Math.random()}
              loading={loadingStatus === 'loading'}
              style={{minWidth: '900px'}}
              columns={PackColumns}
              className={style.booking_information_table}
              dataSource={FormattedCardPackData(cardPacks)}
              pagination={false}
            />
          </div>
          <Pagination
            onChange={onPaginatorChange}
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