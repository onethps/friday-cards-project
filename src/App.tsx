import React, { ReactElement, useEffect } from 'react';

import './App.scss';
import { AppRoutes } from 'components/AppRoutes';
import { Preloader } from 'components/common';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { initializeAppTC } from 'store/reducers/app';
import { useAppDispatch } from 'store/store';

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
