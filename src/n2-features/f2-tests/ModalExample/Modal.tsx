import React, {CSSProperties} from 'react';
import s from './Modal.module.css'

interface IModal {
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;
    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    show: boolean
    children?: React.ReactNode
}




const Modal:React.FC<IModal> = (
    {
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},
        width,
        height,
        modalStyle,
        modalOnClick = () => {},

        show,
        children,
    }
) => {



    if (!show) return null;

    return (
        <>
            {enableBackground && <div
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
            />}
            <div
                style={{
                    position: 'fixed',
                    top:0,
                    left:0,
                    width,
                    height,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    background: 'lime',
                    zIndex: 21,

                    ...modalStyle,
                }}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};

export default Modal;