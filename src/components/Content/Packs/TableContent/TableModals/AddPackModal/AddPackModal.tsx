import React, { memo, ReactElement, useState } from 'react';

import CustomInput from 'common/CustomInput/CustomInput';
import ModalContainer from 'common/ModalContainer/ModalContainer';
import s from 'components/Content/Packs/TableContent/TableModals/AddPackModal/AddPackModal.module.scss';
import { addNewPackTC } from 'store/reducers/packs';
import { useAppDispatch } from 'store/store';

type AddPackModalType = {
  showAddModal: boolean;
  setShowAddModal: (bool: boolean) => void;
};

const AddPackModal = memo(
  ({ showAddModal, setShowAddModal }: AddPackModalType): ReactElement => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');

    const onAddPackHandler = (): void => {
      dispatch(addNewPackTC(value));
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
  },
);

export default AddPackModal;
