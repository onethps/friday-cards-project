import React from 'react';
import {Button, Space} from "antd";

const TableButtonActions = () => {
    return (
        <div>
            <Space size="middle">
                <Button style={{background:'red', color:'white'}} >Delete </Button>
                <Button type={"primary"} >Edit</Button>
                <Button type={"primary"}>Learn</Button>
            </Space>
        </div>
    );
};

export default TableButtonActions;
