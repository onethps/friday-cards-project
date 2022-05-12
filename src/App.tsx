import React, {useEffect} from 'react';
import './App.scss';
import {useAppDispatch} from "./n1-main/m2-bll/store";
import Preloader from "./n1-main/m1-ui/u1-common/c2-Preloader/Preloader";
import {AppRoutes} from "./n1-main/m1-ui/u2-components/AppRoutes";
import {initializeAppTC} from "./n1-main/m2-bll/b1-reducers/app-reducer";
import {useTypedSelector} from "./n3-hooks/useTypedSelector";

const App = () => {

    const dispatch = useAppDispatch();

    let AppLoadingStatus = useTypedSelector((state) => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (AppLoadingStatus === 'loading') {
        return (
            <div className='preloaderPosition'>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className='App'>
            <AppRoutes/>
        </div>
    );
}

export default App;
