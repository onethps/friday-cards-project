import {ResponseCardType} from "api/packs";
import React from "react";
import TableButtonActions from "components/Content/Packs/TableContent/TableActionsButtons/TableButtonActions";


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
        render: (value:string, record:ResponseCardType) =>
            <TableButtonActions key={record._id}
                                userId={record.user_id}
                                packId={record._id}
            packName={record.name}
            />

    },

]

