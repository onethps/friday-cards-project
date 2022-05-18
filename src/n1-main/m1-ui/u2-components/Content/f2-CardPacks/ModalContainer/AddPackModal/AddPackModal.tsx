import React, {useState} from 'react';
import Modal from "../../../../../../../n2-features/f3-modal/Modal";
import s from './AddPackModal.module.scss'
import CustomInput from "../../../../../u1-common/c1-CustomInput/CustomInput";
import {useAppDispatch} from "../../../../../../m2-bll/store";
import {addNewPackTC} from "../../../../../../m2-bll/b1-reducers/packs-reducer";

type AddPackModalType = {
    showAddModal: boolean
    setShowAddModal: (bool:boolean) => void

}

const AddPackModal = ({showAddModal, setShowAddModal}:AddPackModalType) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>('')


    const onAddPackHandler = () => {
        dispatch(addNewPackTC(value))
        setShowAddModal(false)
        setValue('')
    }



    return (
        <>
            <Modal width={500} height={300} show={showAddModal}
                   backgroundOnClick={() => setShowAddModal(false)}
                   enableBackground={true}>

                <div className={s.modalContainer}>
                    <h1>Add New Pack</h1>
                    <span>X</span>
                    <div className={s.border}/>
                    <div className={s.customInput}>
                        <CustomInput label={'Name Pack'} type={'text'} value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                    </div>
                    <button className={s.buttonCancel} onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button className={s.buttonSubmit} onClick={onAddPackHandler}>Save</button>
                </div>
            </Modal>
        </>
    );
};

export default AddPackModal;