import React from 'react';
import s from './MusicTitle.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router-dom';
import question from './../../../img/question.svg';
export const MusicTitle = () => {
    const track = useAppSelector(state => state.playerReducer.track);
    const playlist = useAppSelector(state => state.playerReducer.playlist);

    if (!track) {
        return (
            <div className={s.musicTitle}></div>
        );
    }
    return (
        <div className={s.musicTitle}>
            <img className={s.musicTitle__img} src={track.album?.images[0].url || playlist?.images[0].url || question}/>
            <div className={s.musicTitle__box}>
                <span className={s.musicTitle__box__text}>{track.name}</span>
                <div className={s.box__authors}>
                    {track.artists.map(artist => (
                        <Link to={`artist/${artist.id}`} key={artist.id} className={s.box__authors__text}>
                            {`${artist.name}`}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};