import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface YandexContextSlice {
    accessToken?: string
}

const initialState: YandexContextSlice = {
}

export const yandexContextSlice = createSlice({
    name: 'yandexContext',
    initialState,
    reducers: {
        setYandexAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setYandexAccessToken } = yandexContextSlice.actions

export default yandexContextSlice.reducer
