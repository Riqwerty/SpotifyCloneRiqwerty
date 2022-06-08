import React, { VFC } from 'react';
import s from './Mixes.module.scss';
import { Mix } from './Mix/Mix';
import { ICollectionOfReleases } from './../../../../types/commonTypes';
interface IProps {
    mixes: ICollectionOfReleases
}
export const Mixes: VFC<IProps> = ({ mixes }) => {
    return (
        <section className={s.mixes}>
            {mixes.items.map((mix, index) => <Mix key={mix.id} number={index + 1} mix={mix}/>)}
        </section>
    );
};