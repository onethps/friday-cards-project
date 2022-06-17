import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { PATH } from 'components/AppRoutes';
import l from 'components/Auth/Login/Login.module.scss';
import CustomInput from 'common/CustomInput/CustomInput';
import Preloader from 'common/Preloader/Preloader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { RequestStatusType } from 'store/reducers/app';
import { loginTC } from 'store/reducers/login';
import { useAppDispatch } from 'store/store';
import { loginValidation } from 'utils/validators/validators';

export const Login = (): ReactElement => {
  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn);
  const errorMessage = useTypedSelector(state => state.login.error);
  const loadingStatus = useTypedSelector<RequestStatusType>(
    state => state.login.loadingStatus,
  );

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      // email: '',
      // password: '',
      email: 'onethps@gmail.com',
      password: 'dwqdwqdqw214124',
      rememberMe: false,
    },
    validate: loginValidation,
    onSubmit: loginData => {
      dispatch(loginTC(loginData));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <>
      <div className={l.loginBox}>
        <h1>It-incubator</h1>
        <h2>Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          />

          <CustomInput
            password
            label="Password"
            {...formik.getFieldProps('password')}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''
            }
          />

          <div className={l.forgotPassword}>
            <NavLink to={PATH.RECOVERY_PASSWORD}>Forgot Password</NavLink>
          </div>

          <div className={l.rememberBox}>
            <input type="checkbox" {...formik.getFieldProps('rememberMe')} />
            <label>Remember Me</label>
          </div>

          {loadingStatus === 'loading' ? (
            <div className={l.preloaderBox}>
              {' '}
              <Preloader />
            </div>
          ) : (
            <div className={l.loginButtonBox}>
              <div className={l.errorBox}>
                {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}
              </div>
              <button type="submit">Login</button>

              <h3>Don’t have an account?</h3>
              <h4>
                <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
              </h4>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
