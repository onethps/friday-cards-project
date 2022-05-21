import React, {useState} from 'react';
import Modal from "components/common/ModalContainer/Modal";
import s from 'components/Content/f2-Packs/ModalContainer/EditPackNameModal/EditPackNameModal.module.scss'
import {useAppDispatch} from "store/store";
import {editPackNameTC} from "store/reducers/packs";
import CustomInput from "components/common/CustomInput/CustomInput";
import closeIcon from "assets/icons/close-modal-icon.svg"
import ModalContainer from "components/common/ModalContainer/ModalContainer";

type EditPackNameModal = {
    showModal:boolean
    setShowModal: (bool:boolean) => void
    packId:string
    packName:string
}


const EditPackNameModal = ({showModal, setShowModal, packId, packName}:EditPackNameModal) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState(packName)

    const onEditPackNameHandler = () => {
        dispatch(editPackNameTC(packId, value))
        setShowModal(false)

    }

    return (
        <div>

            <ModalContainer
                active={showModal} setActive={setShowModal}
                title={"Edit Pack Name"} onASubmit={onEditPackNameHandler}>
                <CustomInput label={"New Pack Name"} value={value}
                             onChange={(e) => setValue(e.currentTarget.value)}/>
                <div className={s.buttonBlock}>
                    <button className={s.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={s.buttonSubmit} onClick={onEditPackNameHandler}>Delete</button>
                </div>
            </ModalContainer>

        </div>
    );
};

export default EditPackNameModal;