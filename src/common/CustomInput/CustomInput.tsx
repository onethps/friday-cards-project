import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import l from './CustomInput.module.scss'
import showPasswordIcon from "../icons/eye.svg";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    error?: string
    label?:string
    password?:boolean


}

const CustomInput: React.FC<SuperInputTextPropsType> = ({
                                                            label,
                                                            error,
                                                            password,
                                                            ...restProps
                                                        }) => {

    const[showPassword, setShowPassword] = useState<string>('password')

    const onShowPassword = () => {
        if (showPassword === "text") {
            setShowPassword("password")
        }
        if (showPassword === "password") {
            setShowPassword("text")
        }
    }

    return (
        <div className={l.inputBox}>
            <input
                required={true}
                type={password ? showPassword : ''}
                {...restProps}/>
            {password && <img alt={'showPasswordIcon'} onClick={onShowPassword} src={showPasswordIcon}/>}
            <label>{label ? label : 'Input'}</label>
            { error && <div className={l.errorMessage}>{error}</div>}
        </div>
    );
};

export default CustomInput;