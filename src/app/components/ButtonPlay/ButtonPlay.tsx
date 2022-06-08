import React, { VFC, MouseEvent } from 'react';
import s from './ButtonPlay.module.scss';
interface IProps {
    size: number,
    isPlaying: boolean,
    onClick?: (e: MouseEvent<HTMLElement>) => void,
}
export const ButtonPlay: VFC<IProps> = ({ size, isPlaying, onClick }) => {
    const styleButton = {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${0}px`,
    };
    const sizeElement = size / 4;
    const stylePlay = {
        borderTopWidth: `${sizeElement}px`,
        borderBottomWidth: `${sizeElement}px`,
        borderLeftWidth: `${sizeElement * 1.8}px`,
        marginLeft: `${size / 15}px`,
    };
    const stylePause = {
        height: `${sizeElement * 2}px`,
        width: `${sizeElement * 1.8}px`,
    };
    const onClickHandler = (e: MouseEvent<HTMLElement>) => {
        onClick && onClick(e);
    };
    return (
        <button className={s.button} style={styleButton} onClick={onClickHandler}>
            <div style={isPlaying ? stylePause : stylePlay} className={isPlaying ? s.pause : s.play }></div>
        </button>
    );
};