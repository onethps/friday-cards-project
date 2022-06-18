import React, { FC, useState } from 'react';

import CustomInput from 'common/CustomInput/CustomInput';
import ModalContainer from 'common/ModalContainer/ModalContainer';
import s from 'components/Content/Packs/TableContent/TableModals/EditPackNameModal/EditPackNameModal.module.scss';
import { editPackNameTC } from 'store/reducers/packs';
import { useAppDispatch } from 'store/store';
import { useParams } from "react-router-dom";

type EditPackNameModal = {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  packId: string;
  packName: string;
  category:string;
};

const EditPackNameModal:FC<EditPackNameModal> = ({
                                                   showModal,
                                                   setShowModal,
                                                   packId,
                                                   packName,
                                                   category,
                                                 }) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(packName);

  const onEditPackNameHandler = () => {
    if (category) {
      dispatch(editPackNameTC(packId, value, category));
    }
    setShowModal(false);
  };
  return (
    <div>
      <ModalContainer active={showModal}
                      setActive={setShowModal} title="Edit Pack Name">
        <CustomInput
          label="New Pack Name"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
        <div className={s.buttonBlock}>
          <button className={s.btnCancel}
                  onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className={s.btnSave}
                  onClick={onEditPackNameHandler}>
            Save
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default EditPackNameModal;
