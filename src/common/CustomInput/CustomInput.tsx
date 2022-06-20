import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

import showPasswordIcon from 'assets/icons/eye.svg';
import style from 'common/CustomInput/styles/CustomInput.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  error?: string;
  label?: string;
  password?: boolean;
};

const CustomInput: React.FC<SuperInputTextPropsType> = ({
  label,
  error,
  password,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState<string>('password');

  const onShowPassword = (): void => {
    if (showPassword === 'text') {
      setShowPassword('password');
    }
    if (showPassword === 'password') {
      setShowPassword('text');
    }
  };

  return (
    <div className={style.inputBox}>
      <input required type={password ? showPassword : ''} {...restProps} className={style.inputBoxInput} />
      {password && (
        <img className={style.inputBoxImg} alt="showPasswordIcon" onClick={onShowPassword} src={showPasswordIcon} />
      )}
      <label className={style.inputBoxLabel}>{label || 'Input'}</label>
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

export default CustomInput;
