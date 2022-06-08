import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSearch } from '../../api/apiSearch';
import { EnumOfStatusFetching } from '../../types/apiTypes';
import { ICollectionOfReleases } from '../../types/commonTypes';
interface IMainPageData {
    mixes: null | ICollectionOfReleases,
    collectionOfPlaylists: Array<ICollectionOfReleases>,
}
const initialState = {
    status: EnumOfStatusFetching.Loading,
    mixes: null as null | ICollectionOfReleases,
    collectionOfPlaylists: [] as Array<ICollectionOfReleases>,
};
export const mainPageReducer = createSlice({
    name: 'mainPageReducer',
    initialState,
    reducers: {
        setStatus(state, { payload }: PayloadAction<EnumOfStatusFetching>) {
            state.status = payload;
        },

        setData(state, { payload }: PayloadAction<IMainPageData>) {
            state.mixes = payload.mixes;
            state.collectionOfPlaylists = payload.collectionOfPlaylists;
        },
    },
});
export const mainPageReducerActions = {
    setStatusMainPage: mainPageReducer.actions.setStatus,
};
const { setStatus, setData } = mainPageReducer.actions;
export const fetchMainPage = createAsyncThunk(
    'mainPageReducer/fetchMainPage',
    async (_, { dispatch }) => {
        Promise.allSettled([
            apiSearch.getPlaylists('Story Of The Year', 6),
            apiSearch.getPlaylists('Linkin Park', 12),
            apiSearch.getPlaylists('Hero', 12),
            apiSearch.getPlaylists('Antidote', 12),
        ])
            .then(data => {
                const objResponse: IMainPageData = {
                    mixes: null,
                    collectionOfPlaylists: [],
                };

                data.forEach((response, index) => {
                    if (response.status === 'rejected') {
                        return;
                    }
                    if (index === 0) {
                        objResponse.mixes = response.value;
                    } else {
                        objResponse.collectionOfPlaylists.push(response.value);
                    }
                });
                dispatch(setData(objResponse));
                dispatch(setStatus(EnumOfStatusFetching.Success));
            })
            .catch(() => dispatch(setStatus(EnumOfStatusFetching.Error)));
    },
);