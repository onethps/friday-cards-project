import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import l from 'components/Auth/Register/Register.module.scss';
import CustomInput from 'common/CustomInput/CustomInput';
import Preloader from 'common/Preloader/Preloader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { registerTC } from 'store/reducers/register';
import { useAppDispatch } from 'store/store';
import { RegisterValidate } from 'utils/validators/validators';

export const Register = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { errorMessage, isRegistered, isFetchingLoader } = useTypedSelector(
    state => state.register,
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: RegisterValidate,
    onSubmit: values => {
      dispatch(registerTC(values.email, values.password));
    },
  });

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={l.loginBox}>
      <h1>It-incubator</h1>
      <h2>Sign Up</h2>

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

        <CustomInput
          password
          label="Confirm Password"
          {...formik.getFieldProps('confirmPassword')}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''
          }
        />

        {isFetchingLoader ? (
          <Preloader />
        ) : (
          <div className={l.buttonBlock}>
            <a href="/login" className={l.backToLoginLink}>
              Login
            </a>
            <button className={l.submitButton} type="submit">
              Register
            </button>
          </div>
        )}

        {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}
      </form>
    </div>
  );
};
