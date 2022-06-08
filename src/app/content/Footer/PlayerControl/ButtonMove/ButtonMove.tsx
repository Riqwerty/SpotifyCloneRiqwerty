import React, { VFC } from 'react';
import s from './ButtonMove.module.scss';
interface IProps {
    img: string
    onClick(): void
}
export const ButtonMove: VFC<IProps> = ({ img, onClick }) => {
    return (
        <button onClick={onClick} className={s.button}>
            <img className={s.button__img} src={img}/>
        </button>
    );
};