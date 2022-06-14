import ButtonActions from "components/Content/Card/ButtonActions/ButtonActions";
import { ResponseCardContent } from "types";

export const CardColumns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: '_id',
  },

  {
    title: 'Answer',
    dataIndex: 'answer',
    key: '_id',
  },

  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: '_id',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: '_id',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: '_id',
    render: (value: string, record: ResponseCardContent) =>
        <ButtonActions key={record._id}  record={record}/>
  },

];
