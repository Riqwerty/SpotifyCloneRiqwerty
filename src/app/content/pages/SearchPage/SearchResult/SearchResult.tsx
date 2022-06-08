import React from 'react';
import s from './SearchResult.module.scss';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { EnumOfStatusFetching } from '../../../../types/apiTypes';
import { Recommendation } from '../../../../components/Recommendation/Recommendation';
import { Playlist } from '../../../../components/Playlist/Playlist';
import { Error } from '../../../../components/Error/Error';
export const SearchResult = () => {
    const status = useAppSelector(state => state.searchReducer.status);
    const artists = useAppSelector(state => state.searchReducer.artists);
    const albums = useAppSelector(state => state.searchReducer.albums);
    const playlists = useAppSelector(state => state.searchReducer.playlists);
    const playlist = useAppSelector(state => state.searchReducer.playlist);
    if (status === EnumOfStatusFetching.Error ||
        !(artists || albums || playlists || playlist)) {
        return <Error/>;
    }
    if ((artists && !artists.items.length) && (albums && !albums.items.length)
        && (playlists && !playlists.items.length) && (playlist && !playlist.tracks.length)) {
        return <div>Поиск не дал результатов :-/</div>;
    }
    return (
        <section className={s.searchResult}>
            {artists && artists.items.length
                ? <Recommendation title='Исполнители' releases={artists}/>
                : null
            }

            {albums && albums.items.length
                ? <Recommendation title='Альбомы'  releases={albums}/>
                : null
            }

            {playlists && playlists.items.length
                ? <Recommendation title='Плейлисты' releases={playlists}/>
                : null
            }

            {playlist && playlist.tracks.length
                ? <Playlist playlist={playlist}/>
                : null
            }
        </section>
    );
};