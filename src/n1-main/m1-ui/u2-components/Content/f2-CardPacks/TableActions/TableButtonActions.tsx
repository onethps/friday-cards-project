import React, {useState} from 'react';
import {useTypedSelector} from "../../../../../../n3-hooks/useTypedSelector";
import {Button, Row, Space} from "antd";
import {NavLink} from "react-router-dom";
import DeleteModal from "../ModalContainer/DeleteModal/DeleteModal";


type TableType = {
    userId:string
    packId:string
    packName:string
    toggle?:boolean
}


const TableButtonActions = ({userId, packId, packName, toggle}:TableType) => {

    const {id} = useTypedSelector(state => state.profile)

    const [ModalDelete, setModalDelete] = useState(false)
    const [ModalEdit, setModalEdit] = useState(false)

    return (
        <div key={packId}>
            <DeleteModal
                showModal={ModalDelete}
                setShowModal={setModalDelete}
                packName={packName} packId={packId}/>
            <Row justify={'end'} >
                <Space size={'middle'}>
                    {userId === id ?
                        <>
                            <Button type="primary" danger onClick={() =>setModalDelete(true)}>Delete</Button>
                            <Button type="primary" >Edit</Button>
                            <NavLink to={`/packlist/cards/${packId}`}>
                                <Button type={"primary"}>Learn</Button>
                            </NavLink>
                        </>
                        :
                        <NavLink to={`/packlist/cards/${packId}`}>
                            <Button type={"primary"}>Learn</Button>
                        </NavLink>

                    }
                </Space>
            </Row>
        </div>
    );
};

export default TableButtonActions;
