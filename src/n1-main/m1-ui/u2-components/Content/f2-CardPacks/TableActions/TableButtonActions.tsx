import React from 'react';
import {Button, Space} from "antd";
import {useSelector} from "react-redux";
import s from './TableButtonActions.module.scss'
import {AppRootStateType} from "../../../../../m2-bll/store";


const TableButtonActions = () => {

    const profileId = useSelector<AppRootStateType, string>(state => state.profile.id)
    const isCardPackOwner = useSelector<AppRootStateType, any>(state => state.cardPacks.cardPacks.some(() => !profileId))


    return (
        <div>
            <Space size="middle">
                <Button className={isCardPackOwner ? s.redButtonStyle : s.redButtonHiddenStyle}>Delete </Button>
                <Button className={isCardPackOwner ? s.blueButton : s.redButtonHiddenStyle} >Edit</Button>
                <Button type={"primary"}>Learn</Button>
            </Space>
        </div>
    );
};

export default TableButtonActions;
