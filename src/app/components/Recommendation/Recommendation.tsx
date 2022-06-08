import React, { VFC } from 'react';
import s from './Recommendation.module.scss';
import { ICollectionOfReleases } from '../../types/commonTypes';
import { Link } from 'react-router-dom';
import { Release } from '../Release/Release';
interface IProps {
    title: string,
    releases: ICollectionOfReleases,
}
export const Recommendation: VFC<IProps> = ({ title, releases }) => {
    const hrefToCollection = `collection/${releases.type}/${releases.id}`;
    return (
        <article className={s.recommendation}>
            <div className={s.headline}>
                <Link className={s.headline__header} to={hrefToCollection}>{title}</Link>
                <Link className={s.headline__all} to={hrefToCollection}>все</Link>
            </div>

            <div className={s.containerNoWrap}>
                {releases.items.map(release => <Release key={release.id} item={release}/>)}
            </div>
        </article>
    );
};