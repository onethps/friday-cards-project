import React, { ReactElement, useState } from 'react';

import { useParams } from 'react-router-dom';

import style from 'components/Auth/PasswordRecovery/NewPassword/NewPassword.module.scss';
import SuccessPasswordChanged from 'components/Auth/PasswordRecovery/NewPassword/SuccessPasswordChanged/SuccessPasswordChanged';
import CustomInput from 'common/CustomInput/CustomInput';
import Preloader from 'common/Preloader/Preloader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { senNewPasswordTC } from 'store/reducers/forgotPassword';
import { useAppDispatch } from 'store/store';

const NewPassword = (): ReactElement => {
  const { token } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useTypedSelector(state => state.forgotPassword.isLoading);
  const newPasswordStatus = useTypedSelector(
    state => state.forgotPassword.newPasswordStatus,
  );

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSendNewPasswordHandler = () => {
    if (password.length < 8) {
      setError('Password must be over 8 characters');
      return;
    }
    if (token) dispatch(senNewPasswordTC(password, token));
  };

  if (newPasswordStatus) {
    return <SuccessPasswordChanged />;
  }

  return (
    <div className={style.loginBox}>
      <h1>It-incubator</h1>

      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <h2>Create new password</h2>
          <CustomInput
            error={error}
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
            password
            label="Password"
          />

          <h3>Create new password and we will send you further instructions to email</h3>

          <button onClick={onSendNewPasswordHandler}>Create new password</button>
        </div>
      )}
    </div>
  );
};

export default NewPassword;
