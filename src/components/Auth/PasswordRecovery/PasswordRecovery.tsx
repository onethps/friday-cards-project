import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { PATH } from 'components/AppRoutes';
import SuccessMessage from 'components/Auth/PasswordRecovery/SuccessMessage/SuccessMessage';
import l from 'components/Auth/PasswordRecovery/PasswordRecovery.module.scss';
import CustomInput from 'components/common/CustomInput/CustomInput';
import Preloader from 'components/common/Preloader/Preloader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { forgotPasswordTC } from 'store/reducers/forgotPassword';
import { useAppDispatch } from 'store/store';
import { forgotPageValidation } from 'utils/validators/validators';

const PasswordRecovery = (): ReactElement => {
  const dispatch = useAppDispatch();

  const forgotError = useTypedSelector(state => state.forgotPassword.error);
  const isLoadingStatus = useTypedSelector(state => state.forgotPassword.isLoading);
  const isSendMessage = useTypedSelector(state => state.forgotPassword.isSendMessage);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: forgotPageValidation,
    onSubmit: values => {
      dispatch(forgotPasswordTC(values.email));
    },
  });

  if (isSendMessage) {
    return <SuccessMessage />;
  }

  return (
    <div className={l.loginBox}>
      <h1>It-incubator</h1>

      {isLoadingStatus ? (
        <div style={{ marginTop: '40%' }}>
          <Preloader />
        </div>
      ) : (
        <div>
          <h2>Forgot your password?</h2>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              label="Email"
              {...formik.getFieldProps('email')}
              error={
                formik.touched.email && formik.errors.email ? formik.errors.email : ''
              }
            />

            <h3>Enter your email address and we will send you further instructions </h3>

            <div className={l.errorBox}>{forgotError && <span>{forgotError}</span>}</div>

            <div className={l.loginButtonBox}>
              <button type="submit">Send Instructions</button>
              <h3>Did you remember your password?</h3>
              <h4>
                <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
              </h4>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordRecovery;
