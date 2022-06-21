import React, { ReactElement, useState } from 'react';

import CustomInput from 'common/CustomInput/CustomInput';
import ModalContainer from 'common/ModalContainer/ModalContainer';
import s from 'components/Content/Packs/TableContent/TableModals/AddPackModal/AddPackModal.module.scss';
import { useAppDispatch } from 'store/store';
import { useLocation } from "react-router-dom";
import { addNewPackTC } from "store/middlewares/packFlow";

type AddPackModalType = {
  showAddModal: boolean;
  setShowAddModal: (bool: boolean) => void;
};

const AddPackModal = ({showAddModal, setShowAddModal}: AddPackModalType): ReactElement => {
  const dispatch = useAppDispatch();
  const location = useLocation()

  const [value, setValue] = useState<string>('');

  const onAddPackHandler = (): void => {
    const categoryQuery = location.pathname === '/profile' ? 'my' : ''
    dispatch(addNewPackTC(value, categoryQuery));
    setShowAddModal(false);
    setValue('');
  };

  return (
    <>
      <ModalContainer
        title="Add New Pack"
        active={showAddModal}
        setActive={setShowAddModal}
      >
        <div className={s.customInput}>
          <CustomInput
            label="Name Pack"
            type="text"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
        </div>

        <div className={s.buttonBlock}>
          <button className={s.buttonCancel} onClick={() => setShowAddModal(false)}>
            Cancel
          </button>
          <button className={s.buttonSubmit} onClick={onAddPackHandler}>
            Save
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default AddPackModal;
