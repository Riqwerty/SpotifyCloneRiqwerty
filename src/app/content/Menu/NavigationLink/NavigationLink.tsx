import React, { FC } from 'react';
import s from './NavigationLink.module.scss';

import { NavLink } from 'react-router-dom';

interface IProps {
    to: string,
    title: string,
    img: string,
}

export const NavigationLink: FC<IProps> = ({ to, title, img }) => {
    return (
        <div className={s.containerLink}>
            <NavLink className={s.link} to={to}>
                <img className={s.img} src={img}/>
                <span className={s.text}>{title}</span>
            </NavLink>
        </div>
    );
};