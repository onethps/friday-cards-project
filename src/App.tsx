import React, { ReactElement, useEffect } from 'react';

import './App.scss';
import { AppRoutes } from 'components/AppRoutes';
import { Preloader } from 'common';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useAppDispatch } from 'store/store';
import { initializeAppTC } from "store/middlewares/initialaizeApp";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const AppLoadingStatus = useTypedSelector(state => state.app.status);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (AppLoadingStatus === 'loading') {
    return (
      <div className="preloaderPosition">
        <Preloader />
      </div>
    );
  }


  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
