import React from 'react';
import Modal from "../../../../../../../n2-features/f3-modal/Modal";
import s from './DeleteModal.module.scss'

type DeleteModal = {
    showModal:boolean
    setShowModal: (bool:boolean) => void
    packName:string
}


const DeleteModal = ({showModal, setShowModal, packName}:DeleteModal) => {





    return (
        <div>
            <Modal width={500} height={240} show={showModal}
                   enableBackground={true} backgroundOnClick={() => setShowModal(false)}>
                <div className={s.modalContainer}>
                    <h1>Delete Pack</h1>
                    <span>X</span>
                    <div className={s.border}/>
                    <p>
                        Do you really want to remove
                        <span> {packName} </span>
                        All cards will be excluded from this course.
                    </p>

                    <button className={s.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={s.buttonCancel}>Delete</button>


                </div>

            </Modal>
        </div>
    );
};

export default DeleteModal;