import React, { FC } from 'react';
import s from 'components/Content/Packs/TableContent/TableModals/DeleteModal/DeleteModal.module.scss'
import { useAppDispatch } from "store/store";
import { deletePackTC } from "store/reducers/packs";
import ModalContainer from "common/ModalContainer/ModalContainer";

type DeleteModal = {
  showModal: boolean
  setShowModal: (bool: boolean) => void
  packName: string
  packId: string
  category:string
}


const DeleteModal:FC<DeleteModal> = ({showModal, setShowModal, packName, packId, category}) => {

  const dispatch = useAppDispatch()

  const onDeleteHandler = () => {
    if (category) {
      dispatch(deletePackTC(packId, category))
    }
    setShowModal(false)

  }

  return (
    <div>
      <ModalContainer
        title={"Delete Pack"}
        active={showModal}
        setActive={setShowModal}
      >
        <p style={{margin: '20px 0'}}>
          Do you really want to remove
          <span style={{fontSize: '22px', fontWeight: '600'}}> {packName} </span>
          All cards will be excluded from this course.
        </p>
        <div className={s.buttonBlock}>
          <button className={s.btnCancel} onClick={() => setShowModal(false)}>Cancel</button>
          <button className={s.btnDel} onClick={onDeleteHandler}>Delete</button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default DeleteModal;