import { api } from './api';
import { EnumOfPlaylistTypes } from './../types/commonTypes';
import { IServerAlbum, IServerPlayList } from '../types/serverTypes';

export const apiPlayList = {
    getAlbum(id: string) {
        return api.get<IServerAlbum>(`albums/${id}`)
            .then(response => ({
                ...response.data,
                type: EnumOfPlaylistTypes.album,
                tracks: response.data.tracks.items,
            }));
    },

    getPlayList(id: string) {
        return api.get<IServerPlayList>(`playlists/${id}`)
            .then(response => ({
                ...response.data,
                type: EnumOfPlaylistTypes.playlist,
                tracks: response.data.tracks.items.map(item => item.track),
            }));
    },
};
