import React, { VFC, useState, useEffect, useRef, ChangeEvent } from 'react';
import s from './ProgressBar.module.scss';
interface IProps {
    width: number,
    progressValue: number,
    onMouseUp?: (n: number) => void,
    onChange?: (n: number) => void,
}
export const ProgressBar: VFC<IProps> = ({ width, progressValue, onChange, onMouseUp }) => {
    const [progress, setProgress] = useState(0);
    const isDependence = useRef(true);

    useEffect(() => {
        if (isDependence.current) {
            setProgress(progressValue);
        }
    }, [progressValue]);
    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value / 100;
        if (onChange) {
            isDependence.current = true;
            onChange(value);
        } else {
            setProgress(value);
        }
    };
    const MouseDownHandler = () => {
        isDependence.current = false;
    };
    const MouseUpHandler = () => {
        isDependence.current = true;
        onMouseUp && onMouseUp(progress);
    };
    const styleWidth = {
        width: `${width}px`,
    };
    const styleForProgress = {
        width: `${progress * 100}%`,
    };
    const styleForThumb = {
        left: `${progress * 100}%`,
        marginLeft: `-${progress * 10}px`,
    };
    return (
        <div className={s.container} style={styleWidth}
            onMouseDown={MouseDownHandler} onMouseUp={MouseUpHandler}>
            <div className={s.progress} style={styleForProgress}/>
            <div className={s.thumb} style={styleForThumb}/>
            <input className={s.range} type='range' style={styleWidth} onChange={ChangeHandler}/>
        </div>
    );
};
