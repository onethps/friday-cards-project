import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from 'components/AppRoutes';
import l from 'components/Auth/PasswordRecovery/PasswordRecovery.module.scss';
import { useTypedSelector } from 'hooks/useTypedSelector';

const SuccessPasswordChanged = (): ReactElement => {
  const message = useTypedSelector(state => state.recoverPassword.newPasswordStatus);

  return (
    <div className={l.loginBox}>
      <h1>It-incubator</h1>
      <h2>{message}</h2>

      <h4>
        <NavLink to={PATH.LOGIN}>Back to Login</NavLink>
      </h4>
    </div>
  );
};

export default SuccessPasswordChanged;
