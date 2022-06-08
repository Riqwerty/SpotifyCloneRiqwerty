import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSearch } from '../../api/apiSearch';
import { EnumOfStatusFetching } from '../../types/apiTypes';
import { ICollectionOfReleases, IPlaylist } from './../../types/commonTypes';

interface ISearchData {
    searchText: string,
    albums: ICollectionOfReleases,
    artists: ICollectionOfReleases,
    playlists: ICollectionOfReleases,
    playlist: IPlaylist,
}
const initialState = {
    status: EnumOfStatusFetching.Loading,
    searchText: '',
    albums: null as null | ICollectionOfReleases,
    artists: null as null | ICollectionOfReleases,
    playlists: null as null | ICollectionOfReleases,
    playlist: null as null | IPlaylist,
};
export const searchReducer = createSlice({
    name: 'searchReducer',
    initialState,
    reducers: {
        setStatus(state, { payload }: PayloadAction<EnumOfStatusFetching>) {
            state.status = payload;
        },

        setData(state, { payload }: PayloadAction<ISearchData>) {
            state.searchText = payload.searchText;
            state.albums = payload.albums;
            state.artists = payload.artists;
            state.playlists = payload.playlists;
            state.playlist = payload.playlist;
        },
    },
});
export const searchReducerActions = {
    setStatusSearchPage: searchReducer.actions.setStatus,
};
const { setStatus, setData } = searchReducer.actions;
export const fetchSearch = createAsyncThunk(
    'searchReducer/fetchSearch',
    async ({ searchText }: { searchText: string }, { dispatch }) => {
        try {
            dispatch(setStatus(EnumOfStatusFetching.Loading));
            const data = await apiSearch.getAll(searchText || 'Хиты');
            dispatch(setData({
                ...data,
                searchText,
            }));
            dispatch(setStatus(EnumOfStatusFetching.Success));
        } catch(e) {
            dispatch(setStatus(EnumOfStatusFetching.Error));
        }
    },
);