import { api } from './api';
import { EnumOfPlaylistTypes, EnumOfCollectionTypes, IRelease } from '../types/commonTypes';
import { IServerArtists, IServerCollectionItems, IServerTracks } from '../types/serverTypes';
export const apiArtist =  {
    getArtist(id: string) {
        return api.get<IRelease>(`artists/${id}`)
            .then(response => response.data);
    },
    getArtistAlbums(id: string) {
        return api.get<IServerCollectionItems>(`artists/${id}/albums`)
            .then(response => ({
                id,
                type: EnumOfCollectionTypes.albums,
                items: response.data.items,
            }));
    },
    getArtistTopTrack(id: string) {
        return api.get<IServerTracks>(`artists/${id}/top-tracks?market=ES`)
            .then(response => ({
                id,
                type: EnumOfPlaylistTypes.playlist,
                name: '',
                images: [],
                tracks: response.data.tracks,
            }));
    },
    getRelatedArtists(id: string) {
        return api.get<IServerArtists>(`artists/${id}/related-artists`)
            .then(response => ({
                id,
                type: EnumOfCollectionTypes.artists,
                items: response.data.artists,
            }));
    },
};