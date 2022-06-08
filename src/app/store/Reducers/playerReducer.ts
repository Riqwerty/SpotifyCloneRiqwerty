import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnumOfStatusPlayer } from '../../types/playerTypes';
import { IPlaylist, ITrack } from '../../types/commonTypes';
const initialState = {
    status: EnumOfStatusPlayer.Success,
    currentTrackIndex: 0,
    playlist: {} as IPlaylist,
    track: null as null | ITrack,
    saveVolume: 0.5,
    volume: 0.5,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
};
export const playerReducer = createSlice({
    name: 'playerReducer',
    initialState,
    reducers: {
        togglePlaying(state) {
            state.isPlaying = !state.isPlaying;
        },
        setDuration(state, { payload }: PayloadAction<number>) {
            state.duration = payload;
        },
        setCurrentTime(state, { payload }: PayloadAction<number>) {
            state.currentTime = payload;
        },
        setVolume(state, { payload }: PayloadAction<number>) {
            state.volume = payload;
        },
        resetVolume(state) {
            state.saveVolume = state.volume;
            state.volume = 0;
        },
        setVolumeFromSaveVolume(state) {
            state.volume = state.saveVolume;
        },
        setPlaylist(state, { payload }: PayloadAction<{playlist: IPlaylist, startIndex?: number}>) {
            state.playlist = payload.playlist;
            state.currentTrackIndex = payload.startIndex || 0;
            state.track = state.playlist.tracks[state.currentTrackIndex];
            state.isPlaying = true;
        },
        nextTrack(state) {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.playlist.tracks.length;
            state.track = state.playlist.tracks[state.currentTrackIndex];
        },
        previousTrack(state) {
            const countTracks = state.playlist.tracks.length;
            state.currentTrackIndex = (state.currentTrackIndex + (countTracks - 1)) % countTracks;
            state.track = state.playlist.tracks[state.currentTrackIndex];
        },
        setPlayerStatus(state, { payload }: PayloadAction<EnumOfStatusPlayer>) {
            state.status = payload;
        },
    },
});
export const playerReducerActions = playerReducer.actions;