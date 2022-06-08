import React from 'react';
import s from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
export const NotFoundPage = () => {
    return (
        <div className={s.container}>
            <h2 className={s.title}>Ошибка. Страница не найдена</h2>
            <Link to='/' className={s.link}>Главная</Link>
        </div>
    );
};