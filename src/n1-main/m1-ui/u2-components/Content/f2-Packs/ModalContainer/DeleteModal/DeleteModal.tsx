import React from 'react';
import Modal from "../../../../../../../n2-features/f3-modal/Modal";
import s from './DeleteModal.module.scss'
import {useAppDispatch} from "../../../../../../m2-bll/store";
import {deletePackTC} from "../../../../../../m2-bll/b1-reducers/packs-reducer";
import DialogModalContainer from "../../../../../u1-common/DialogModalContainer/DialogModalContainer";

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
            <DialogModalContainer
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
            </DialogModalContainer>
        </div>
    );
};

export default DeleteModal;