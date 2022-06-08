import React, { VFC } from 'react';
import s from './Mix.module.scss';
import { Link } from 'react-router-dom';
import { IRelease } from '../../../../../types/commonTypes';
interface IProps {
    number: number
    mix: IRelease
}
export const Mix: VFC<IProps> = ({ number, mix }) => {
    return (
        <article>
            <Link className={s.mix__link} to={`playlist/playlist/${mix.id}`}>
                <img className={s.mix__img} src={mix.images[0].url} alt='Плейлист аватар'/>
                <div className={s.mix__boxText}>
                    <span className={s.mix__boxText__text}>Плейлист № {number}</span>
                </div>
            </Link>
        </article>
    );
};