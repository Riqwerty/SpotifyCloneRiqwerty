import { api } from './api';
import { EnumOfPlaylistTypes, EnumOfCollectionTypes } from '../types/commonTypes';
import { IServerSearchData } from '../types/serverTypes';

export const apiSearch = {
    getAll(searchText: string) {
        return api.get<IServerSearchData>(`search?type=album,artist,playlist,track&q=${searchText}&limit=10`)
            .then(response => ({
                albums: {
                    id: searchText,
                    type: EnumOfCollectionTypes.albums,
                    items: response.data.albums.items,
                },

                artists: {
                    id: searchText,
                    type: EnumOfCollectionTypes.artists,
                    items: response.data.artists.items,
                },

                playlists: {
                    id: searchText,
                    type: EnumOfCollectionTypes.playlists,
                    items: response.data.playlists.items,
                },

                playlist: {
                    id: searchText,
                    type: EnumOfPlaylistTypes.playlist,
                    name: '',
                    images: [],
                    tracks: response.data.tracks.items,
                },
            }));
    },

    getPlaylists(searchText: string, limit = 50) {
        return api.get<IServerSearchData>(`search?type=playlist&q=${searchText}&limit=${limit}`)
            .then(response => ({
                id: searchText,
                type: EnumOfCollectionTypes.playlists,
                items: response.data.playlists.items,
            }));
    },

    getAlbums(searchText: string, limit = 50) {
        return api.get<IServerSearchData>(`search?type=album&q=${searchText}&limit=${limit}`)
            .then(response => ({
                id: searchText,
                type: EnumOfCollectionTypes.albums,
                items: response.data.albums.items,
            }));
    },

    getArtists(searchText: string, limit = 50) {
        return api.get<IServerSearchData>(`search?type=artist&q=${searchText}&limit=${limit}`)
            .then(response => ({
                id: searchText,
                type: EnumOfCollectionTypes.artists,
                items: response.data.artists.items,
            }));
    },
};