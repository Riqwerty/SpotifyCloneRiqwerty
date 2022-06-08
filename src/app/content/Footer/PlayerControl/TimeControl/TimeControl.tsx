import React, { VFC, useEffect } from 'react';
import s from './TimeControl.module.scss';
import { timeFormatFromSeconds } from '../../../../utils/timeFormat';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppActions } from '../../../../hooks/useAppAction';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
interface IProps {
    audio: HTMLAudioElement
}
export const TimeControl: VFC<IProps> = ({ audio }) => {
    const duration = useAppSelector(state => state.playerReducer.duration);
    const currentTime = useAppSelector(state => state.playerReducer.currentTime);
    const { setCurrentTime } = useAppActions();
    const setProgress = (n: number) => {
        audio.currentTime = n  * duration;
    };
    useEffect(() => {
        const callback = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('timeupdate', callback);
        return () => audio.removeEventListener('timeupdate', callback);
    }, []);
    return (
        <div className={s.container}>
            <span className={s.time}>{timeFormatFromSeconds(currentTime)}</span>
            <ProgressBar width={300} progressValue={currentTime / duration} onMouseUp={setProgress}/>
            <span className={s.time}>{timeFormatFromSeconds(duration)}</span>
        </div>
    );
};