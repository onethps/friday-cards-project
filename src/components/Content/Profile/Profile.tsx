import React, { useEffect, useState } from 'react';
import s from 'components/Content/Profile/Profile.module.scss'
import { Slider } from "antd";
import Header from "components/Header/Header";
import { Link, Navigate } from "react-router-dom";
import { PATH } from "components/AppRoutes";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useAppDispatch } from "store/store";
import TableContent from "components/Content/Packs/TableContent/TableContent";
import useDebounce from "hooks/debounceHook";
import { setFilterAC } from "store/actions/packs";
import { fetchPacksTC } from "store/middlewares/packFlow";

const Profile = () => {
  const dispatch = useAppDispatch();
  const myProfileId = useTypedSelector(state => state.profile.id)
  const myProfileName = useTypedSelector(state => state.profile.name)
  const myProfileAvatar = useTypedSelector(state => state.profile.avatar)
  const minCardsCount = useTypedSelector(state => state.cardPacks.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.cardPacks.maxCardsCount)
  const page = useTypedSelector(state => state.cardPacks.page)
  const pageCount = useTypedSelector(state => state.cardPacks.pageCount)
  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn)


  const [slider, setSlider] = useState([minCardsCount, maxCardsCount])
  const [searchText, setSearchText] = useState<string>('');

  const debouncedSearch = useDebounce(searchText, 500);
  const debouncedSlider = useDebounce(slider, 500);

  const onPaginatorChange = (page:number, pageCount:number) => {
    dispatch(setFilterAC({page, pageCount}))
  }

  useEffect(() => {
    const searchQuery = searchText ? searchText : ''
    dispatch(fetchPacksTC(slider[0], slider[1], page, pageCount, searchQuery, myProfileId))
  }, [debouncedSearch, debouncedSlider, page, pageCount])


  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }


  return (
    <>
      <nav>
        <Header/>
      </nav>
      <div className={s.root}>
        <div className={s.leftSide}>
          <div className={s.profileInfoBox}>
            <img src={myProfileAvatar ? myProfileAvatar: 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'} alt={'ava'}/>
            <h3>{myProfileName}</h3>
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
          <TableContent onPaginatorChange={onPaginatorChange}
                        searchText={searchText} setSearchText={setSearchText}
                        page={page}
                        showAddNewPackButton={false}
                        pageCount={pageCount}/>
        </div>
      </div>
    </>
  );
};

export default Profile;