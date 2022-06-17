import React, { FC, useState } from 'react';

import { Button, Row, Space } from 'antd';
import { NavLink } from 'react-router-dom';

import DeleteModal from 'components/Content/Packs/TableContent/TableModals/DeleteModal/DeleteModal';
import EditPackNameModal from 'components/Content/Packs/TableContent/TableModals/EditPackNameModal/EditPackNameModal';
import { useTypedSelector } from 'hooks/useTypedSelector';
import TableContent from "components/Content/Packs/TableContent/TableContent";

type TableType = {
  userId: string;
  packId: string;
  packName: string;
};

const TableButtonActions: FC<TableType> = ({ userId, packId, packName }) => {
  const { id } = useTypedSelector(state => state.profile);

  const [ModalDelete, setModalDelete] = useState(false);
  const [ModalEdit, setModalEdit] = useState(false);

  return (
    <div key={packId}>
      <DeleteModal
        showModal={ModalDelete}
        setShowModal={setModalDelete}
        packName={packName}
        packId={packId}
      />

      <EditPackNameModal
        showModal={ModalEdit}
        setShowModal={setModalEdit}
        packId={packId}
        packName={packName}
      />

      <Row justify="end">
        <Space size="middle">
          {userId === id ? (
            <>
              <Button type="primary" danger onClick={() => setModalDelete(true)}>
                Delete
              </Button>
              <Button type="primary" onClick={() => setModalEdit(true)}>
                Edit
              </Button>
              <NavLink to={`/packlist/train/${packId}`}>
                <Button type="primary">Learn</Button>
              </NavLink>
            </>
          ) : (
            <NavLink to={`/packlist/train/${packId}`}>
              <Button type="primary">Learn</Button>
            </NavLink>
          )}
        </Space>
      </Row>
    </div>
  );
};

export default TableButtonActions;
