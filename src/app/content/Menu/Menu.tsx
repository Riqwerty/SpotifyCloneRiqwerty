import React from 'react';
import s from './Menu.module.scss';

import { Link } from 'react-router-dom';
import { NavigationLink } from './NavigationLink/NavigationLink';

import logo  from './img/LogoSpotify.svg';
import home from './img/home.svg';
import heart from './img/heart.svg';
import search from './img/search.svg';

export const Menu = () => {
    return (
        <aside className={s.aside}>
            <div className={s.containerLink}>
                <Link className={s.logo} to='/'>
                    <img src={logo} alt="Логотип"/>
                </Link>
            </div>

            <nav className={s.navigation}>
                <NavigationLink title='Главная' img={home} to='/' />
                <NavigationLink title='Поиск' img={search} to='search'/>
                <NavigationLink title='Моя медиатека' img={heart} to='collection/playlists/need for speed most wanted'/>
            </nav>

            <div className={s.line}/>
        </aside>
    );
};
