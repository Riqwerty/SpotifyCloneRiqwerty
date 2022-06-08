import React, { useEffect } from 'react';
import s from './MainPage.module.scss';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppActions } from '../../../hooks/useAppAction';
import { EnumOfStatusFetching } from '../../../types/apiTypes';
import { Mixes } from './Mixes/Mixes';
import { Recommendation } from '../../../components/Recommendation/Recommendation';
import { Error } from '../../../components/Error/Error';
export const MainPage = () => {
    const status = useAppSelector(state => state.mainPageReducer.status);
    const mixes = useAppSelector(state => state.mainPageReducer.mixes);
    const collectionOfPlaylists = useAppSelector(state => state.mainPageReducer.collectionOfPlaylists);
    const { fetchMainPage, setStatusMainPage } = useAppActions();
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMainPage();
        return () => {
            setStatusMainPage(EnumOfStatusFetching.Loading);
        };
    }, []);
    if (status === EnumOfStatusFetching.Error ||
        !(mixes || collectionOfPlaylists.length)) {
        return <Error/>;
    }
    return (
        <div className={s.mainPage}>
            <h1 className={s.headline}>Добрый день</h1>
            {mixes && <Mixes mixes={mixes}/>}
            {collectionOfPlaylists.map(playlist => (
                <Recommendation releases={playlist} title='Рекомендации для вас' key={playlist.id}/>
            ))}
        </div>
    );
};