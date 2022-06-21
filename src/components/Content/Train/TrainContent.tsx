import React, { FC, useState } from 'react';
import s from "components/Content/Train/Train.module.scss";
import { Field, Form, Formik } from "formik";
import { ResponseCardType } from "api/packs";
import { ResponseCardContent } from "types";
import { useAppDispatch } from "store/store";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { fetchCardsTC, updateGradeTC } from "store/middlewares/cardFlow";

type TrainContentType = {
  currentCard: ResponseCardType | undefined
  randomResult: ResponseCardContent
}


const TrainContent: FC<TrainContentType> = ({currentCard, randomResult}) => {
  const dispatch = useAppDispatch();
  const [showAnswer, setShowAnswer] = useState(true)
  const navigate = useNavigate()

  const {cardsTotalCount} = useTypedSelector(state => state.card)
  const loading = useTypedSelector(state => state.card.loading)

  const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

  const formikInit = {
    picked: '',
  }

  const formikSubmit = ({picked}:{picked:string}) => {
    if (randomResult) {
      dispatch(updateGradeTC(picked, randomResult._id))
    }
    if (!picked) {
      dispatch(fetchCardsTC({cardsPack_id: randomResult.cardsPack_id, pageCount: cardsTotalCount}))
    }
    setShowAnswer(true)
  }

  const onCancelBtnHandler = () => navigate('/packlist/all')

  if (loading){
    return <div>loading</div>
  }


  return (
    <>
      <h2>Learn "{currentCard?.name}"</h2>

      <div className={s.questionBlock}>
        <div>
          <h3>Question:</h3>
          <span>"{randomResult.question}"</span>
        </div>
      </div>
      { showAnswer ?
        <div>
          <div className={s.buttonBlock}>
            <button className={s.cancelBtn} onClick={onCancelBtnHandler}>Cancel</button>
            <button className={s.submitBtn} onClick={() => setShowAnswer(false)}>Show Answer</button>
          </div>
        </div>
        :
        <div className={s.answerBlock}>
          <h3>Answer:</h3>
          <span>"{randomResult.answer}"</span>
          <Formik
            initialValues={formikInit}
            onSubmit={formikSubmit}
          >
            {({values}) => (
              <Form className={s.formBlock}>
                <h4>Rate yourself</h4>
                <div className={s.formRadioBlock} role={'group'} aria-labelledby="my-radio-group">
                  {grades.map((elem, i) =>
                    <label key={elem}>
                      <Field type={'radio'} name={'picked'} value={`${i + 1}`}/>
                      <span>{elem}</span>
                    </label>
                  )}
                </div>
                <div className={s.buttonBlock}>
                  <button className={s.cancelBtn}  onClick={onCancelBtnHandler}>Cancel</button>
                  <input type={'submit'} className={s.submitBtn} title={'next'}/>
                </div>
              </Form>
            )}
          </Formik>
        </div>

      }

    </>
  );
};

export default TrainContent;