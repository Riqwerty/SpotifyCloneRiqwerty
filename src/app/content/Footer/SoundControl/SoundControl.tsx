import React, { VFC, useEffect } from 'react';
import s from './SoundControl.module.scss';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppActions } from '../../../hooks/useAppAction';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import loudVolume from './img/loudVolume.svg';
import mediumVolume from './img/mediumVolume.svg';
import quietVolume from './img/quietVolume.svg';
import noVolume from './img/noVolume.svg';
interface IProps {
    audio: HTMLAudioElement
}
export const SoundControl: VFC<IProps> = ({ audio }) => {
    const volume = useAppSelector(state => state.playerReducer.volume);
    const { setVolume, resetVolume, setVolumeFromSaveVolume } = useAppActions();
    useEffect(() => {
        audio.volume = volume;
    }, [volume]);
    const setProgressVolume = (volume: number) => {
        setVolume(volume);
    };
    const getImgVolume = () => {
        if (volume === 0) {
            return noVolume;
        } else if (volume < 0.33) {
            return quietVolume;
        } else if (volume < 0.66) {
            return mediumVolume;
        } else {
            return loudVolume;
        }
    };
    const onClickButton = () => {
        if (volume) {
            resetVolume();
        } else {
            setVolumeFromSaveVolume();
        }
    };
    return (
        <div className={s.sound}>
            <button className={s.button} onClick={onClickButton}>
                <img className={s.button__img} src={getImgVolume()} alt="Звук"/>
            </button>
            <ProgressBar width={80} progressValue={volume} onChange={setProgressVolume}/>
        </div>
    );
};