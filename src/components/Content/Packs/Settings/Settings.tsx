import React from 'react';
import style from "components/Content/Packs/Settings/Settings.module.scss";
import { Slider } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const Settings = ({
                    minMaxSlider,
                    setMinMaxSlider
                  }: { minMaxSlider: number[], setMinMaxSlider: (arr: number[]) => void }) => {

  const navigate = useNavigate()
  const {category} = useParams()


  // const onChangeMinMaxSliderValue = (sliderValues: number[]): void => Max(sliderValues);

  let styleButton = category === 'my' ? `${style.tabButton} ${style.active}` : `${style.tabButton}`
  let styleButtonAll = category === 'my' ? `${style.tabButton}` : `${style.tabButton} ${style.active}`


  return (
    <div className={style.leftSideContainer}>
      <div className={style.leftSideContentBox}>
        <h3>Show packs cards</h3>
        <div className={style.buttonGroup}>
          <button onClick={() => navigate('/packlist/' + 'my')} className={styleButton}>My</button>
          <button onClick={() => navigate('/packlist/' + 'all')} className={styleButtonAll}>All
          </button>
        </div>

        <h3>Number of cards</h3>
        <div>

          <Slider
            className={style.sliderStyle}
            onChange={setMinMaxSlider}
            range
            defaultValue={[
              minMaxSlider[0],
              minMaxSlider[1]
            ]}
            disabled={false}
          />

        </div>
      </div>
    </div>

  );
};

export default Settings;