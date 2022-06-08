import React, { useEffect } from 'react';
import s from './PlaylistPage.module.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from '../../../hooks/useAppAction';
import { EnumOfStatusFetching } from '../../../types/apiTypes';
import { EnumOfPlaylistTypes } from '../../../types/commonTypes';
import { Playlist } from '../../../components/Playlist/Playlist';
import { Error } from '../../../components/Error/Error';
export const PlaylistPage = () => {
    const history = useParams<{ type: EnumOfPlaylistTypes, id: string }>();
    const playlist = useAppSelector(state => state.playlistReducer.playlist);
    const status = useAppSelector(state => state.playlistReducer.status);
    const isPlaying = useAppSelector(state => state.playerReducer.isPlaying);
    const playingPlaylist = useAppSelector(state => state.playerReducer.playlist);
    const { fetchPlaylist, setStatusPlaylist, setPlaylist, togglePlaying } = useAppActions();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (history.type && history.id) {
            fetchPlaylist({ id: history.id, type: history.type });
        } else {
            setStatusPlaylist(EnumOfStatusFetching.Error);
        }
        return () => {
            setStatusPlaylist(EnumOfStatusFetching.Loading);
        };
    }, [history]);
    if (status === EnumOfStatusFetching.Error
        || !playlist) {
        return <Error/>;
    }
    const isSetThisPlaylist = playlist.id === playingPlaylist?.id;
    const isPlayingThisPlaylist = isPlaying && isSetThisPlaylist;
    const onClick = () => {
        if (isSetThisPlaylist) {
            togglePlaying();
        } else {
            setPlaylist({ playlist });
        }
    };
    return (
        <div className={s.playlist}>
            <div className={s.playlistTitle}>
                <div className={s.boxImg}>
                    <div className={s.boxImg__container}>
                        <img className={s.boxImg__container__img} src={playlist.images[0].url}/>
                    </div>
                </div>
                <div className={s.playlistTitle__boxText}>
                    <h1 className={s.playlistTitle__boxText__text}>{playlist.name}</h1>
                </div>
            </div>
            <Playlist playlist={playlist}/>
        </div>
    );
};