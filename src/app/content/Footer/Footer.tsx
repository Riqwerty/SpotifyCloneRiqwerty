import React, { useMemo } from 'react';
import s from './Footer.module.scss';
import { MusicTitle } from './MusicTitle/MusicTitle';
import { PlayerControl } from './PlayerControl/PlayerControl';
import { SoundControl } from './SoundControl/SoundControl';
import { useAppSelector } from '../../hooks/useAppSelector';
import { EnumOfStatusPlayer } from '../../types/playerTypes';
export const Footer = () => {
    const audio = useMemo(() => new Audio(), []);
    const status = useAppSelector(state => state.playerReducer.status);
    return (
        <footer className={s.footer}>
            {status === EnumOfStatusPlayer.Error
                ? <div className={s.error}>Этот трек нельзя прослушать. Так решил музыкант, или его представитель.</div>
                : <div className={s.success}></div>
            }
            <div className={s.player}>
                <MusicTitle/>
                <PlayerControl audio={audio}/>
                <SoundControl audio={audio}/>
            </div>
        </footer>
    );
};