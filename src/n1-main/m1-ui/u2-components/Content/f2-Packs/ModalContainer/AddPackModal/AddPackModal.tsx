import React, {useState} from 'react';
import s from './AddPackModal.module.scss'
import CustomInput from "../../../../../u1-common/c1-CustomInput/CustomInput";
import {useAppDispatch} from "../../../../../../m2-bll/store";
import {addNewPackTC} from "../../../../../../m2-bll/b1-reducers/packs-reducer";
import DialogModalContainer from "../../../../../u1-common/DialogModalContainer/DialogModalContainer";

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
            <DialogModalContainer title={"Add New Pack"} onASubmit={onAddPackHandler}
                                  active={showAddModal} setActive={setShowAddModal}>
                <div className={s.customInput}>
                    <CustomInput label={'Name Pack'} type={'text'}
                                 value={value}
                                 onChange={(e) => setValue(e.currentTarget.value)}/>
                </div>
                <div className={s.buttonBlock}>
                    <button className={s.buttonCancel} onClick={() => setShowAddModal(false)}>Cancel</button>
                    <button className={s.buttonSubmit} onClick={onAddPackHandler}>Save</button>
                </div>

            </DialogModalContainer>
        </>
    );
};

export default AddPackModal;