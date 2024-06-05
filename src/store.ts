import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, persistCombineReducers,
} from 'redux-persist'
import {bookContextSlice} from "@features/book/BookContext/bookContextSlice.ts"
import {yandexContextSlice} from "@features/yandex/YandexContext/yandexContextSlice.ts";
import {characterContextSlice} from "@features/character/CharacterContext/characterContextSlice.ts";

const persistConfig = {
    key: 'writerConfig',
    version: 1,
    storage,
    timeout: 500
}


const persistedReducers = persistCombineReducers(persistConfig, {
    bookContext: bookContextSlice.reducer,
    yandexContext: yandexContextSlice.reducer,
    characterContext: characterContextSlice.reducer
})

export const store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
