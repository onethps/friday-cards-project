import TableButtonActions from "./TableActions/TableButtonActions";
import {ResponseCardType} from "../../../../m3-dal/packs-api";
import {NavLink} from "react-router-dom";
import React from "react";
import {PATH} from "../../AppRoutes";



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
            <NavLink to={`/packlist/cards/${record._id}`}>{record.name}</NavLink>
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
        render: () => <TableButtonActions/>
    },

]

