import React from 'react';
import s from './ArrowsForwardBack.module.scss';
import { useNavigate } from 'react-router-dom';
export const ArrowsForwardBack = () => {
    const navigation = useNavigate();
    return (
        <header className={s.header}>
            <div className={s.history}>
                <button className={`${s.button} ${s.buttonBack}`} onClick={() => navigation(-1)}/>
                <button className={`${s.button} ${s.buttonForward}`} onClick={() => navigation(1)}/>
            </div>
        </header>
    );
};