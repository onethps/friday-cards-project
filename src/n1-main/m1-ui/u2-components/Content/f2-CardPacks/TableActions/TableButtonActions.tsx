import React from 'react';
import {Button, Space} from "antd";
import s from './TableButtonActions.module.scss'
import {useTypedSelector} from "../../../../../../n3-hooks/useTypedSelector";


const TableButtonActions = () => {

    const profileId = useTypedSelector(state => state.profile.id)
    const isCardPackOwner = useTypedSelector(state => state.cardPacks.cardPacks.some(() => !profileId))


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
