import React, { VFC, useEffect } from 'react';
import s from './PlayerControl.module.scss';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppActions } from '../../../hooks/useAppAction';

import { EnumOfStatusPlayer } from '../../../types/playerTypes';

import { ButtonPlay } from '../../../components/ButtonPlay/ButtonPlay';
import { ButtonMove } from './ButtonMove/ButtonMove';
import { TimeControl } from './TimeControl/TimeControl';

import left from './img/left.svg';
import right from './img/right.svg';

interface IProps {
    audio : HTMLAudioElement
}

export const PlayerControl: VFC<IProps> = ({ audio }) => {
    const { previousTrack, nextTrack, togglePlaying, setDuration, setPlayerStatus } = useAppActions();
    const isPlaying = useAppSelector(state => state.playerReducer.isPlaying);
    const track = useAppSelector(state => state.playerReducer.track);

    useEffect(() => {
        const setDurationHandler = () => setDuration(audio.duration);
        audio.addEventListener('loadedmetadata', setDurationHandler);

        const nextTrackHandler = () => nextTrack();
        audio.addEventListener('ended', nextTrackHandler);

        return () => {
            audio.removeEventListener('loadedmetadata', setDurationHandler);
            audio.removeEventListener('ended', nextTrackHandler);
        };
    }, []);

    useEffect(() => {
        if (track) {
            if (track.preview_url) {
                audio.src = track.preview_url;
                setPlayerStatus(EnumOfStatusPlayer.Success);
            } else {
                audio.src = '';
                setPlayerStatus(EnumOfStatusPlayer.Error);
            }
        }
    }, [track]);

    useEffect(() => {
        const downloadFullDataHandler = () => (isPlaying ? audio.play() : audio.pause());
        audio.addEventListener('loadeddata', downloadFullDataHandler);

        if (track && track.preview_url) {
            isPlaying ? audio.play() : audio.pause();
        }
        return () => audio.removeEventListener('loadeddata', downloadFullDataHandler);
    }, [isPlaying]);

    return (
        <div className={s.playerControl}>
            <div className={s.playerControl__buttons}>
                <ButtonMove img={left} onClick={previousTrack}/>
                <ButtonPlay size={40} isPlaying={isPlaying} onClick={togglePlaying}/>
                <ButtonMove img={right} onClick={nextTrack}/>
            </div>
            <TimeControl audio={audio}/>
        </div>
    );
};