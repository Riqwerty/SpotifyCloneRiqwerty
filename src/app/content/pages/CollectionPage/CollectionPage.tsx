import React, { useEffect } from 'react';
import s from './CollectionPage.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppActions } from '../../../hooks/useAppAction';
import { EnumOfStatusFetching } from '../../../types/apiTypes';
import { EnumOfCollectionTypes } from '../../../types/commonTypes';
import { Release } from '../../../components/Release/Release';
import { Error } from '../../../components/Error/Error';
export const CollectionReleasesPage = () => {
    const history = useParams<{ type: EnumOfCollectionTypes, searchText: string, id: string }>();
    const status = useAppSelector(state => state.collectionReducer.status);
    const collection = useAppSelector(state => state.collectionReducer.collection);
    const { fetchArtistCollection, fetchSearchCollection, setStatusCollection } = useAppActions();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (history.type && history.searchText) {
            fetchSearchCollection({ searchText: history.searchText, type: history.type });
        } else if (history.id && history.type) {
            fetchArtistCollection({ id: history.id, type: history.type });
        } else {
            setStatusCollection(EnumOfStatusFetching.Error);
        }
        return () => {
            setStatusCollection(EnumOfStatusFetching.Loading);
        };
    }, []);
    const TranslateSearchType = {
        'albums': 'Альбомы',
        'artists': 'Артисты',
        'playlists': 'Плейлисты',
    };
    if (status === EnumOfStatusFetching.Error
            || !collection) {
        return <Error/>;
    }
    return (
        <div>
            {history.type && <h2 className={s.headline}>{`${TranslateSearchType[history.type]}`}</h2>}
            <div className={s.containerWrap}>
                {collection.items.map(item => <Release key={item.id} item={item}/>)}
            </div>
        </div>
    );
};