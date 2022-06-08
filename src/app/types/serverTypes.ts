import { EnumOfPlaylistTypes, IImage, IRelease, ITrack } from './commonTypes';
export interface IServerTracks {
    tracks: Array<ITrack>
}
export  interface IServerArtists {
    artists: Array<IRelease>
}
export interface IServerAlbum {
    id: string,
    type: EnumOfPlaylistTypes,
    name: string,
    images: Array<IImage>,
    tracks: {
        items: Array<ITrack>
    }
}
export interface IServerPlayList {
    id: string,
    type: EnumOfPlaylistTypes,
    name: string,
    images: Array<IImage>,
    tracks: {
        items: Array<{ track: ITrack }>
    }
}
export interface IServerCollectionItems<T = IRelease> {
    items: Array<T>
}
export interface IServerSearchData {
    albums: IServerCollectionItems
    artists: IServerCollectionItems
    playlists: IServerCollectionItems
    tracks: IServerCollectionItems<ITrack>
}