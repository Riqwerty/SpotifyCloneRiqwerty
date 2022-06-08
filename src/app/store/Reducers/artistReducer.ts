import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiArtist } from '../../api/apiArtist';
import { EnumOfStatusFetching } from '../../types/apiTypes';
import { ICollectionOfReleases, IRelease } from '../../types/commonTypes';
import { IPlaylist } from './../../types/commonTypes';
interface IArtistData {
    artist: null | IRelease,
    relatedArtists: null | ICollectionOfReleases,
    albums: null | ICollectionOfReleases,
    playlist: null | IPlaylist,
}
const initialState = {
    status: EnumOfStatusFetching.Loading,
    artist: null as null | IRelease,
    relatedArtists: null as null | ICollectionOfReleases,
    albums: null as null | ICollectionOfReleases,
    playlist: null as null | IPlaylist,
};
export const artistReducer = createSlice({
    name: 'artistReducer',
    initialState,
    reducers: {
        setStatus(state, { payload }: PayloadAction<EnumOfStatusFetching>) {
            state.status = payload;
        },
        setData(state, { payload } : PayloadAction<IArtistData>) {
            state.artist = payload.artist;
            state.albums = payload.albums;
            state.relatedArtists = payload.relatedArtists;
            state.playlist = payload.playlist;
        },
    },
});
export const artistReducerActions = {
    setStatusArtistPage: artistReducer.actions.setStatus,
};
const { setStatus, setData } = artistReducer.actions;
export const fetchArtist = createAsyncThunk(
    'artistReducer/fetchArtist',
    async ({ id }: { id: string }, { dispatch }) => {
        Promise.allSettled([
            apiArtist.getArtist(id),
            apiArtist.getArtistAlbums(id),
            apiArtist.getArtistTopTrack(id),
            apiArtist.getRelatedArtists(id),
        ])
            .then(data => {
                const objResponse: IArtistData = {
                    artist: null,
                    albums: null,
                    relatedArtists: null,
                    playlist: null,
                };
                if (data[0].status === 'fulfilled') {
                    objResponse.artist = data[0].value;
                }
                if (data[1].status === 'fulfilled') {
                    objResponse.albums = data[1].value;
                }
                if (data[2].status === 'fulfilled') {
                    objResponse.playlist = data[2].value;
                }
                if (data[3].status === 'fulfilled') {
                    objResponse.relatedArtists = data[3].value;
                }
                dispatch(setData(objResponse));
                dispatch(setStatus(EnumOfStatusFetching.Success));
            })
            .catch(() => dispatch(setStatus(EnumOfStatusFetching.Error)));
    },
);
