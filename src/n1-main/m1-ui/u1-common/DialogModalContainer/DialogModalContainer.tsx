import React from 'react';
import Modal from "../../../../n2-features/f3-modal/Modal";

const DialogModalContainer: React.FC = (children) => {
   const ss = true
    return (
        <>
            <Modal width={400} height={300} show={ss}>
                {/*{children}*/}
            </Modal>

        </>
    );
};

export default DialogModalContainer;