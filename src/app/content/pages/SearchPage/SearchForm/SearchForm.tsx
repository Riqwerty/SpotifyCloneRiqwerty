import React, { useEffect, FormEvent } from 'react';
import s from './SearchForm.module.scss';
import { useAppActions } from '../../../../hooks/useAppAction';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useInput } from '../../../../hooks/useInput';
import { EnumOfStatusFetching } from '../../../../types/apiTypes';
export const SearchForm = () => {
    const searchText = useAppSelector(state => state.searchReducer.searchText);
    const [inputValue, bind] = useInput(searchText);
    const { fetchSearch, setStatusSearchPage } = useAppActions();
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchSearch({ searchText: inputValue });
    };
    useEffect(() => {
        fetchSearch({ searchText: inputValue });
        return () => {
            setStatusSearchPage(EnumOfStatusFetching.Loading);
        };
    }, []);
    return (
        <section>
            <form className={s.searchForm} onSubmit={onSubmitHandler}>
                <input className={s.searchInput} {...bind} type='text' placeholder='Исполнитель, трек или плейлист'/>
                <button className={s.searchButton}>Поиск</button>
            </form>
        </section>
    );
};