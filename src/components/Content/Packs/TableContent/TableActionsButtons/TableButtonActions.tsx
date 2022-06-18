import React, { FC, useState } from 'react';

import { Row, Space } from 'antd';
import { NavLink, useParams } from 'react-router-dom';

import DeleteModal from 'components/Content/Packs/TableContent/TableModals/DeleteModal/DeleteModal';
import EditPackNameModal from 'components/Content/Packs/TableContent/TableModals/EditPackNameModal/EditPackNameModal';
import { useTypedSelector } from 'hooks/useTypedSelector';
import s from './TableButtonActions.module.scss'

type TableType = {
  userId: string;
  packId: string;
  packName: string;
};

const TableButtonActions: FC<TableType> = ({ userId, packId, packName }) => {

  const {category} = useParams();
  const { id } = useTypedSelector(state => state.profile);

  const [ModalDelete, setModalDelete] = useState(false);
  const [ModalEdit, setModalEdit] = useState(false);



  return (
    <div key={packId}>
      <DeleteModal
        category={category ? category : 'my'}
        showModal={ModalDelete}
        setShowModal={setModalDelete}
        packName={packName}
        packId={packId}
      />


      <EditPackNameModal
        category={category ? category : 'my'}
        showModal={ModalEdit}
        setShowModal={setModalEdit}
        packId={packId}
        packName={packName}
      />

      <Row justify="end">
        <Space size="middle">
          {userId === id ? (
            <>
              <button className={s.delBtn} onClick={() => setModalDelete(true)}>
                Delete
              </button>
              <button className={s.learnBtn}  onClick={() => setModalEdit(true)}>
                Edit
              </button>
              <NavLink to={`/packlist/train/${packId}`}>
                <button className={s.learnBtn}>Learn</button>
              </NavLink>
            </>
          ) : (
            <NavLink to={`/packlist/train/${packId}`}>
              <button className={s.learnBtn}>Learn</button>
            </NavLink>
          )}
        </Space>
      </Row>
    </div>
  );
};

export default TableButtonActions;
