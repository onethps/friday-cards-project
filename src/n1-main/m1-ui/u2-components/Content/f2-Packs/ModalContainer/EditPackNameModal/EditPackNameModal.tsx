import React, {useState} from 'react';
import Modal from "../../../../../../../n2-features/f3-modal/Modal";
import s from './EditPackNameModal.module.scss'
import {useAppDispatch} from "../../../../../../m2-bll/store";
import {editPackNameTC} from "../../../../../../m2-bll/b1-reducers/packs-reducer";
import CustomInput from "../../../../../u1-common/c1-CustomInput/CustomInput";
import closeIcon from "../../../../../../../assets/icons/close-modal-icon.svg"
import DialogModalContainer from "../../../../../u1-common/DialogModalContainer/DialogModalContainer";

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

            <DialogModalContainer
                active={showModal} setActive={setShowModal}
                title={"Edit Pack Name"} onASubmit={onEditPackNameHandler}>
                <CustomInput label={"New Pack Name"} value={value}
                             onChange={(e) => setValue(e.currentTarget.value)}/>
                <div className={s.buttonBlock}>
                    <button className={s.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={s.buttonSubmit} onClick={onEditPackNameHandler}>Delete</button>
                </div>
            </DialogModalContainer>

        </div>
    );
};

export default EditPackNameModal;