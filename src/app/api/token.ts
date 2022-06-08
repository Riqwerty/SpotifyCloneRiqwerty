import axios from 'axios';
import qs from 'qs';
import { generateRandomString } from '../utils/generateRandomString';
// 2 диплом
export const token = {
    clientId: '689e5a6bf8114587a3464ab5782befd0',
    clientSecret: 'a5df79ecbef04dd594744b808cfaf29b',
    TOKEN_URL: 'https://accounts.spotify.com/api/token',
    async getToken() {
        const body = qs.stringify({ 'grant_type': 'client_credentials' });
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
            },
        };
        try {
            const response = await axios.post<{access_token: string}>(this.TOKEN_URL, body, config);
            sessionStorage.setItem('token', response.data.access_token);
        } catch(e) {
            console.error(e);
        }
    },
};
// 3 диплом
export const userToken = {
    accessToken: null as string | null,
    refreshToken: null as string | null,
    code: null as string | null,
    authEndPoint: 'https://accounts.spotify.com/authorize',
    RedirectUrl: 'http://localhost:3000',
    Response_Type: 'code',
    scope: 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private ' +
        'user-follow-modify user-follow-read user-library-modify user-library-read streaming ' +
        'user-read-playback-position playlist-modify-private playlist-read-collaborative ' +
        'app-remote-control user-read-email playlist-read-private user-top-read ' +
        'playlist-modify-public user-read-currently-playing user-read-recently-played',
    state: generateRandomString(16),

    getLink(): string {
        return `${this.authEndPoint}?client_id=${token.clientId}` +
            `&state=${this.state}` +
            `&scope=${this.scope}` +
            `&redirect_url=${this.RedirectUrl}` +
            `&response_type=${this.Response_Type}` +
            `&show_dialog=true`;
    },

    async getToken() {
        const clientId = '689e5a6bf8114587a3464ab5782befd0';
        const RedirectUrl =  'http://localhost:3000';
        const clientSecret = 'a5df79ecbef04dd594744b808cfaf29b';
        const TOKEN_URL = 'https://accounts.spotify.com/api/token';
        const body = qs.stringify({
            'grant_type': 'authorization_code',
            'code': this.code,
            'redirect_url': RedirectUrl,
        });
        const config = {
            headers: {
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
        };
        try {
            const response = await axios.post<{ access_token: string, refresh_token: string }>(TOKEN_URL, body, config);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
        } catch(e) {
            console.log(e);
        }
    },
};