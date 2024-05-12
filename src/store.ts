import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {bookContextSlice} from "./features/BookContext/bookContextSlice.ts"
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

const persistConfig = {
    key: 'writerConfig',
    version: 1,
    storage,
    timeout: 500
}


const persistedReducers = persistCombineReducers(persistConfig, {bookContext: bookContextSlice.reducer})

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