import React from 'react';

import closeIcon from 'assets/icons/close-modal-icon.svg';
import Modal from 'common/ModalContainer/Modal';
import s from 'common/ModalContainer/style/ModalContainer.module.scss';

type ModalContainerType = {
  active: boolean;
  setActive: (bool: boolean) => void;
  children: React.ReactNode;
  title?: string;
};

const ModalContainer: React.FC<ModalContainerType> = ({
                                                        title,
                                                        active,
                                                        setActive,
                                                        children,
                                                      }) => (
  <>
    <Modal
      width={400}
      height={370}
      show={active}
      enableBackground
      backgroundOnClick={() => setActive(false)}
    >
      <div className={s.modalContainer}>
        <div className={s.titleBox}>
          <span className={s.title}>{title}</span>
          <img src={closeIcon} onClick={() => setActive(false)} />
        </div>
        <div className={s.border} />
        <div className={s.modalContent}>{children}</div>
      </div>
    </Modal>
  </>
);

export default ModalContainer;
