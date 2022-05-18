import React from 'react';
import Modal from "../../../../n2-features/f3-modal/Modal";
import s from './DialogModalContainer.module.scss'
import closeIcon from "../../../../assets/icons/close-modal-icon.svg";

type DialogModalContainterType = {
    active:boolean
    setActive:(bool:boolean) => void
    children: React.ReactNode
    onASubmit?: () => void
    title:string
}



const DialogModalContainer: React.FC<DialogModalContainterType> = (
    {title,active,setActive,children, onASubmit}) => {

    return (
        <>
            <Modal width={400} height={270} show={active}
                   enableBackground={true} backgroundOnClick={() => setActive(false)}>
                <div className={s.modalContainer}>
                    <div className={s.titleBox}>
                        <span className={s.title}>{title}</span>
                        <img src={closeIcon} onClick={() => setActive(false)}/>
                    </div>
                    <div className={s.border}/>

                    <div className={s.modalContent}>
                        {children}
                    </div>
                </div>
            </Modal>

        </>
    );
};

export default DialogModalContainer;