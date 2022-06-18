import React, { useEffect, useState } from 'react';
import s from 'components/Content/Profile/Profile.module.scss'
import { Slider } from "antd";
import Header from "components/Header/Header";
import { Link } from "react-router-dom";
import { PATH } from "components/AppRoutes";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "store/store";
import { fetchPacksTC } from "store/reducers/packs";
import TableContent from "components/Content/Packs/TableContent/TableContent";
import useDebounce from "hooks/debounceHook";

const Profile = () => {
  const dispatch = useAppDispatch();
  const myProfileId = useTypedSelector(state => state.profile.id)
  const minCardsCount = useTypedSelector(state => state.cardPacks.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.cardPacks.maxCardsCount)
  const page = useTypedSelector(state => state.cardPacks.page)
  const pageCount = useTypedSelector(state => state.cardPacks.pageCount)



  const [slider, setSlider] = useState([minCardsCount, maxCardsCount])
  const [searchText, setSearchText] = useState<string>('');

  const debouncedSearch = useDebounce(searchText, 500);
  const debouncedSlider = useDebounce(slider, 500);

  useEffect(() => {
    const searchQuery = searchText ? searchText : ''
    dispatch(fetchPacksTC(minCardsCount, maxCardsCount, page, pageCount, searchQuery, myProfileId))
  }, [debouncedSearch, debouncedSlider])




  return (
    <>
      <nav>
        <Header/>
      </nav>
      <div className={s.root}>
        <div className={s.leftSide}>
          <div className={s.profileInfoBox}>
            <img src={'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'} alt={'ava'}/>
            <h3>Ivan Ivanov</h3>
            <span>Front-end developer</span>
            <button><Link to={`${PATH.PROFILE}/${myProfileId}`}>Edit profile</Link></button>
          </div>
          <div className={s.profileNumberBox}>
            <h3>Number of cards</h3>
            <Slider
              className={s.sliderStyle}
              onChange={setSlider}
              range
              defaultValue={[
                slider[0],
                slider[1]
              ]}
              disabled={false}
            />

          </div>

        </div>
        <div className={s.rightSide}>
          <TableContent searchText={searchText} setSearchText={setSearchText} page={1} pageCount={10}/>
        </div>
      </div>
    </>
  );
};

export default Profile;