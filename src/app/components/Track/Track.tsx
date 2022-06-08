import React, { useState, VFC } from 'react';
import s from './Track.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppActions } from './../../hooks/useAppAction';
import { ITrack } from '../../types/commonTypes';
import { Link } from 'react-router-dom';
import { timeFormatFromMilliseconds } from '../../utils/timeFormat';
import { ButtonPlay } from './../ButtonPlay/ButtonPlay';
interface IProps {
    index: number,
    isSetThisPlaylist: boolean;
    track: ITrack,
    setTrack: () => void,
}
export const Track: VFC<IProps> = ({ track, index, setTrack, isSetThisPlaylist }) => {
    const playingTrack = useAppSelector(state => state.playerReducer.track);
    const isPlaying = useAppSelector(state => state.playerReducer.isPlaying);
    const [active, setActive] = useState(false);

    const { togglePlaying } = useAppActions();

    const isChooseThisTrack = isSetThisPlaylist && playingTrack?.id === track.id;
    const isPlayingThisTrack = isPlaying && isChooseThisTrack;

    const onClickHandler = () => {
        if (isChooseThisTrack) {
            togglePlaying();
        } else {
            setTrack();
        }
    };
    return (
        <article onClick={onClickHandler} className={isChooseThisTrack ? s.isChooseSong : s.song}
            onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
            <div className={s.box}>
                {isChooseThisTrack || active
                    ? <ButtonPlay size={30} isPlaying={isPlayingThisTrack}/>
                    : <span className={s.box__text}>{index + 1}</span>
                }
            </div>
            <div className={s.box}>
                {track.album?.images?.[0].url &&
                    <img className={s.box__img} src={track.album?.images[0]?.url}/>
                }
                <div className={s.box__title}>
                    <span className={s.box__text}>{track.name}</span>
                    <div className={s.box__authors}>
                        {track.artists.map(artist => (
                            <Link onClick={e => e.stopPropagation()} to={`/artist/${artist.id}`}
                                key={artist.id} className={s.box__authors__author}>
                                {artist.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={s.box}>
                <Link onClick={e => e.stopPropagation()} className={s.box__album}
                    to={`/playlist/album/${track?.album?.id}`}>
                    {track?.album?.name}
                </Link>
            </div>
            <div className={s.box}>
                <span className={s.box__text}>{timeFormatFromMilliseconds(track.duration_ms)}</span>
            </div>
        </article>
    );
};