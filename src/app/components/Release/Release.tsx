import React, { VFC } from 'react';
import s from './Release.module.scss';
import { EnumOfItemTypes, IRelease } from '../../types/commonTypes';
import { Link } from 'react-router-dom';
import question from './../../img/question.svg';
interface IProps {
    item: IRelease,
}
export const Release: VFC<IProps> = ({ item }) => {
    const href = item.type === EnumOfItemTypes.artist
        ? `/artist/${item.id}`
        : `/playlist/${item.type}/${item.id}`;
    return (
        <article className={s.release}>
            <Link to={href} className={s.release__link}>
                <div className={s.release__boxImg}>
                    <img className={s.release__boxImg__img} src={item.images[0]?.url || question } alt="" />
                </div>
                <div className={s.release__boxText}>
                    <span className={s.release__boxText__text}>{item.name}</span>
                </div>
            </Link>
        </article>
    );
};