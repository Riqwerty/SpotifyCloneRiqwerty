import React, { useEffect } from 'react';
import s from './SearchPage.module.scss';
import { SearchForm } from './SearchForm/SearchForm';
import { SearchResult } from './SearchResult/SearchResult';
export const SearchPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={s.searchPage}>
            <SearchForm/>
            <SearchResult/>
        </div>
    );
};