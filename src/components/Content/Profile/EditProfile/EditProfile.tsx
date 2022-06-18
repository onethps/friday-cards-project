import React, { FC, useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import onLoadAvatarIcon from 'assets/icons/onLoadAvatar.svg';
import CustomInput from 'common/CustomInput/CustomInput';
import Preloader from 'common/Preloader/Preloader';
import { PATH } from 'components/AppRoutes';
import Header from 'components/Header/Header';

import l from 'components/Content/Profile/EditProfile/EditProfile.module.scss';

import { changeMessageStatusAC, changeProfileInfoTC, logoutTC, } from 'store/reducers/profile';
import { useAppDispatch } from 'store/store';
import { profileValidate } from 'utils/validators/validators';
import { useTypedSelector } from 'hooks/useTypedSelector';

export const EditProfile: FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn);
  const profileName = useTypedSelector(state => state.profile.name);
  const profileEmail = useTypedSelector(state => state.profile.email);
  const loadingStatus = useTypedSelector(state => state.profile.status);
  const changeMessageStatus = useTypedSelector(
    state => state.profile.changeMessageStatus,
  );
  // takes name from email
  const getEmailName = profileName!.includes('@')
    ? profileName!.split('@')[0]
    : profileName;

  const formik = useFormik({
    initialValues: {
      email: profileEmail,
      name: getEmailName,
    },
    validate: profileValidate,
    onSubmit: values => {
      dispatch(changeProfileInfoTC(values.name));
    },
  });

  const onLogoutHandler = (): void => {
    dispatch(logoutTC());
  };

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      dispatch(changeMessageStatusAC(''));
    }, 2000);

    return () => clearTimeout(delayDebounceFn)

  }, [changeMessageStatus]);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <>
      <Header/>

      <div className={l.loginBox}>
        <h2> Personal information</h2>
        <div className={l.avatarBlock}>
          <img
            className={l.avatar}
            src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
          />
          <img className={l.loadAvatar} alt="loadAvatarIcon" src={onLoadAvatarIcon}/>
        </div>

        {loadingStatus === 'loading' ? (
          <div style={{marginTop: '45%'}}>
            <Preloader/>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              label="Name"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
            />
            <CustomInput
              label="Email"
              {...formik.getFieldProps('email')}
              error={
                formik.touched.email && formik.errors.email ? formik.errors.email : ''
              }
            />
            <div style={{height: '50px'}}>
              <h3 style={{color: 'green'}}>{changeMessageStatus}</h3>
            </div>
            <div className={l.buttonBlock}>
              <a onClick={onLogoutHandler} className={l.backToLoginLink}>
                Log Out
              </a>
              <button className={l.submitButton} type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
