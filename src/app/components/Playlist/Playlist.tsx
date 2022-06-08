import React, { VFC } from 'react';
import s from './Playlist.module.scss';
import { useAppActions } from '../../hooks/useAppAction';
import { EnumOfPlaylistTypes, IPlaylist } from './../../types/commonTypes';
import { Track } from '../Track/Track';
import time from './img/time.svg';
import { useAppSelector } from './../../hooks/useAppSelector';
interface IProps {
    playlist: IPlaylist
}
export const Playlist: VFC<IProps> = ({ playlist }) => {
    const playingPlaylist = useAppSelector(state => state.playerReducer.playlist);
    const { setPlaylist } = useAppActions();
    const isSetThisPlaylist = playingPlaylist?.id === playlist.id;
    return (
        <section className={s.playlist}>
            <div className={s.playlist__header}>
                <div className={s.playlist__header__box}>
                    <span className={s.playlist__header__box__text}>№</span>
                </div>
                <div className={s.playlist__header__box}>
                    <span className={s.playList__header__box__text}>Название</span>
                </div>
                <div className={s.playlist__header__box}>
                    <span className={s.playlist__header__box__text}>
                        {playlist.type === EnumOfPlaylistTypes.playlist ? 'Альбом' : ''}
                    </span>
                </div>
                <div className={s.playlist__header__box}>
                    <img className={s.playlist__header__box__img} src={time}/>
                </div>
            </div>
            <div>
                {playlist.tracks.map((track, i) => (
                    <Track key={track.id} index={i} track={track} isSetThisPlaylist={isSetThisPlaylist}
                        setTrack={() => setPlaylist({ playlist, startIndex: i })}/>
                ))}
            </div>
        </section>
    );
};