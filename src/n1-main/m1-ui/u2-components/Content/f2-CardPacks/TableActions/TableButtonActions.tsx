import React from 'react';
import {useTypedSelector} from "../../../../../../n3-hooks/useTypedSelector";
import {Button, Row, Space} from "antd";
import s from './TableButtonActions.module.scss'


type TableType = {
    myId:string
}

const TableButtonActions = ({myId}:TableType) => {

    const {id} = useTypedSelector(state => state.profile)


    return (
        <div>
            <Row justify={'end'} >
                <Space size={'middle'}>
                    {myId === id ?
                        <>
                            <Button className={s.redButtonStyle}>Delete</Button>
                            <Button className={s.blueButton} >Edit</Button>
                            <Button type={"primary"}>Learn</Button>
                        </>

                        :
                        <Button type={"primary"}>Learn</Button>

                    }
                </Space>
            </Row>
        </div>
    );
};

export default TableButtonActions;
