import React, { useState } from 'react';
import { Button, Row, Space } from "antd";
import ModalContainer from "common/ModalContainer/ModalContainer";
import CustomInput from "common/CustomInput/CustomInput";
import style from "components/Content/Card/Card.module.scss";
import { ResponseCardContent } from "types";
import { useAppDispatch } from "store/store";
import { deleteCardTC, saveEditCardTC } from "store/reducers/card";
import { useParams } from "react-router-dom";

const ButtonActions = ({record}: { record: ResponseCardContent }) => {
  const dispatch = useAppDispatch()
  const {id} = useParams()

  const [isCardOwner, setIsCardOwner] = useState(false)



  const [showModal, setShowModal] = useState(false)
  const [question, setQuestion] = useState(record.question)
  const [answer, setAnswer] = useState(record.answer)

  const onSaveCardInfoHandle = () => {
    if (id) {
      dispatch(saveEditCardTC({
        _id: record._id,
        question,
        comments: answer
      }, id))
    }
  }

  const onDeleteHandle = () => {
    if (record._id) {
      dispatch(deleteCardTC(record._id, record.cardsPack_id))
    }
    setShowModal(false)
  }

  return (
    <>
      <ModalContainer
        title={"Card Info"}
        active={showModal}
        setActive={setShowModal}>

        <CustomInput
          label={'Question'} value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
        />

        <CustomInput
          label={'Answer'} value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
        />

        <div className={style.modalStyle}>
          <button className={style.buttonCancel} onClick={() => setShowModal(false)}>Cancel</button>
          <button className={style.buttonSubmit} onClick={onSaveCardInfoHandle}>Save</button>
        </div>
      </ModalContainer>
      <Row justify={"end"}>
        <Space size="middle">
          <Button type={'primary'} onClick={() => setShowModal(true)}>Edit</Button>
          <Button type={'primary'} onClick={onDeleteHandle}
                  style={{background: 'red', border: 'red', color: 'white'}}>Delete</Button>
        </Space>
      </Row>
    </>
  );
};

export default ButtonActions;