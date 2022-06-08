import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiPlayList } from '../../api/apiPlayList';
import { EnumOfStatusFetching } from '../../types/apiTypes';
import { EnumOfPlaylistTypes, IPlaylist } from './../../types/commonTypes';
const initialState = {
    status: EnumOfStatusFetching.Loading,
    playlist: null as null | IPlaylist,
};
export const playlistReducer = createSlice({
    name: 'playlistReducer',
    initialState,
    reducers: {
        setStatus(state, { payload }: PayloadAction<EnumOfStatusFetching>) {
            state.status = payload;
        },

        setData(state, { payload }: PayloadAction<IPlaylist>) {
            state.playlist = payload;
        },
    },
});
export const playlistReducerActions = {
    setStatusPlaylist: playlistReducer.actions.setStatus,
};
const { setStatus, setData } = playlistReducer.actions;
export const fetchPlaylist = createAsyncThunk(
    'playlistReducer/fetchPlaylist',
    async ({ id, type }: { id: string, type: EnumOfPlaylistTypes }, { dispatch }) => {
        try {
            if (type === EnumOfPlaylistTypes.album) {
                const album = await apiPlayList.getAlbum(id);
                dispatch(setData(album));
            } else if (type === EnumOfPlaylistTypes.playlist) {
                const playlist = await apiPlayList.getPlayList(id);
                dispatch(setData(playlist));
            }
            dispatch(setStatus(EnumOfStatusFetching.Success));
        } catch(e) {
            dispatch(setStatus(EnumOfStatusFetching.Error));
        }
    },
);