import { configureStore } from '@reduxjs/toolkit';
import { mainPageReducer } from './Reducers/mainPageReducer';
import { playerReducer } from './Reducers/playerReducer';
import { playlistReducer } from './Reducers/playlistReducer';
import { searchReducer } from './Reducers/searchReducer';
import { collectionReducer } from './Reducers/collectionReducer';
import { artistReducer } from './Reducers/artistReducer';
export const store = configureStore({
    reducer: {
        [mainPageReducer.name]: mainPageReducer.reducer,
        [playerReducer.name]: playerReducer.reducer,
        [playlistReducer.name]: playlistReducer.reducer,
        [collectionReducer.name]: collectionReducer.reducer,
        [searchReducer.name]: searchReducer.reducer,
        [artistReducer.name]: artistReducer.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
});
export type RootStateType = ReturnType<typeof store.getState>;