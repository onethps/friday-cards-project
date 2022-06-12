import React, { useState } from 'react';

import CustomInput from 'components/common/CustomInput/CustomInput';
import ModalContainer from 'components/common/ModalContainer/ModalContainer';
import s from 'components/Content/Packs/TableContent/TableModals/EditPackNameModal/EditPackNameModal.module.scss';
import { editPackNameTC } from 'store/reducers/packs';
import { useAppDispatch } from 'store/store';
import { useParams } from "react-router-dom";

type EditPackNameModal = {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  packId: string;
  packName: string;
};

const EditPackNameModal = ({
                             showModal,
                             setShowModal,
                             packId,
                             packName,
                           }: EditPackNameModal) => {
  const dispatch = useAppDispatch();
  const {category} = useParams();

  const [value, setValue] = useState(packName);

  const onEditPackNameHandler = () => {
    if (category) {
      dispatch(editPackNameTC(packId, value, category));
    }

    setShowModal(false);
  };

  return (
    <div>
      <ModalContainer active={showModal} setActive={setShowModal} title="Edit Pack Name">
        <CustomInput
          label="New Pack Name"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
        <div className={s.buttonBlock}>
          <button className={s.buttonCancel} onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className={s.buttonSubmit} onClick={onEditPackNameHandler}>
            Save
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default EditPackNameModal;
