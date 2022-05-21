import React from 'react';
import Modal from "components/common/ModalContainer/Modal";
import s from 'components/Content/f2-Packs/ModalContainer/DeleteModal/DeleteModal.module.scss'
import {useAppDispatch} from "store/store";
import {deletePackTC} from "store/reducers/packs";
import ModalContainer from "components/common/ModalContainer/ModalContainer";

type DeleteModal = {
    showModal:boolean
    setShowModal: (bool:boolean) => void
    packName:string
    packId:string
}


const DeleteModal = ({showModal, setShowModal, packName, packId}:DeleteModal) => {
    const dispatch = useAppDispatch()

    const onDeleteHandler = () => {
        dispatch(deletePackTC(packId))
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
                    <span style={{fontSize:'22px', fontWeight:'600'}}> {packName} </span>
                    All cards will be excluded from this course.
                </p>
                <div className={s.buttonBlock}>
                    <button className={s.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={s.buttonSubmit} onClick={onDeleteHandler}>Delete</button>
                </div>
            </ModalContainer>
        </div>
    );
};

export default DeleteModal;