export enum EnumOfPlaylistTypes {
    album = 'album',
    playlist = 'playlist',
}
export enum EnumOfItemTypes {
    album = 'album',
    artist = 'artist',
    playlist = 'playlist',
    track = 'track',
}
export enum EnumOfCollectionTypes {
    albums = 'albums',
    artists = 'artists',
    playlists = 'playlists',
}
export interface IImage {
    url: string,
}
export interface IRelease {
    id: string,
    name: string,
    images: Array<IImage>,
    type: EnumOfItemTypes,
}
export interface ICollectionOfReleases {
    id: string,
    type: EnumOfCollectionTypes,
    items: Array<IRelease>,
}
export interface ITrack {
    id: string,
    name: string,
    type: EnumOfItemTypes,
    preview_url: string | null,
    duration_ms: number,
    artists: Array<IRelease>,
    album?: IRelease,
}
export interface IPlaylist {
    id: string,
    type: EnumOfPlaylistTypes,
    name: string,
    images: Array<IImage>,
    tracks: Array<ITrack>,
}