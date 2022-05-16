import {ResponseCardType} from "../../../../m3-dal/packs-api";
import {NavLink} from "react-router-dom";
import React from "react";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";
import TableButtonActions from "./TableActions/TableButtonActions";




export const PackColumns = [
    {
        title: 'Created By',
        dataIndex: 'user_name',
        key: '_id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: '_id',
        render: (value:string, record:ResponseCardType) =>
            <NavLink key={record._id} to={`/packlist/cards/${record._id}`}>{record.name}</NavLink>
        // <NavLink to={`${PATH.CARDS}${record._id}`}>{record.name}</NavLink>
    },
    {
        title: 'CardsCount',
        dataIndex: 'cardsCount',
        key: '_id',
    },

    {
        title: 'LAST UPDATE',
        dataIndex: 'updated',
        key: '_id',
    },

    {
        title: 'Actions',
        dataIndex: 'actions',
        key: '_id',
        render: (value:string, record:ResponseCardType) => <TableButtonActions key={record._id} myId={record.user_id}/>

    },

]

