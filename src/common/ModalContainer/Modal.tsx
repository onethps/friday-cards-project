import React, { CSSProperties } from 'react';

interface IModal {
  enableBackground?: boolean;
  backgroundStyle?: CSSProperties;
  backgroundOnClick?: () => void;
  width: number;
  height: number;
  modalStyle?: CSSProperties;
  modalOnClick?: () => void;
  show: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<IModal> = ({
  enableBackground,
  backgroundStyle,
  backgroundOnClick = () => {},
  width,
  height,
  modalStyle,
  modalOnClick = () => {},

  show,
  children,
}) => {
  if (!show) return null;

  return (
    <>
      {enableBackground && (
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh',
            background: 'black',
            opacity: 0.35,
            zIndex: 20,

            ...backgroundStyle,
          }}
          onClick={backgroundOnClick}
          onKeyDown={backgroundOnClick}
          role="button"
          aria-labelledby="dialogBlackBackground"
          tabIndex={0}
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: '20vh',
          borderRadius: '5px',
          left: '40vw',
          width,
          height,
          background: 'white',
          zIndex: 21,
          boxShadow: '5px 10px 18px #888888',

          ...modalStyle,
        }}
        onClick={modalOnClick}
        role="dialog"
        aria-labelledby="dialogWhiteBackground"
      >
        {children}
      </div>
    </>
  );
};

Modal.defaultProps = {
  enableBackground: false,
  backgroundStyle: { color: 'Black' },
  backgroundOnClick: () => 'BG clicked',
  modalStyle: { background: 'White' },
  modalOnClick: () => 'Modal Clicked',
  children: 'Children Component',
};

export default Modal;
