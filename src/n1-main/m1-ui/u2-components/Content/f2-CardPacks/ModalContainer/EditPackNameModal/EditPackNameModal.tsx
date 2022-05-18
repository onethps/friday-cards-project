import React, {useState} from 'react';
import Modal from "../../../../../../../n2-features/f3-modal/Modal";
import s from './EditPackNameModal.module.scss'
import {useAppDispatch} from "../../../../../../m2-bll/store";
import {editPackNameTC} from "../../../../../../m2-bll/b1-reducers/packs-reducer";
import CustomInput from "../../../../../u1-common/c1-CustomInput/CustomInput";
import closeIcon from "../../../../../../../assets/icons/close-modal-icon.svg"

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
            <Modal width={400} height={240} show={showModal}
                   enableBackground={true} backgroundOnClick={() => setShowModal(false)}>
                <div className={s.modalContainer}>
                    <h1>Edit Pack Name</h1>
                    <img src={closeIcon}/>
                    <div className={s.border}/>
                    <div className={s.customInput}>
                        <CustomInput label={"New Pack Name"} value={value}
                                     onChange={(e) => setValue(e.currentTarget.value)}/>
                    </div>
                    <button className={s.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
                    <button className={s.buttonCancel} onClick={onEditPackNameHandler}>Save</button>
                </div>

            </Modal>
        </div>
    );
};

export default EditPackNameModal;