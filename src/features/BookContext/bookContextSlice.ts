import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IBook} from "../../entities/Book";

export interface BookContextSlice {
    currentBook?: IBook
}

const initialState: BookContextSlice = {

}

export const bookContextSlice = createSlice({
    name: 'bookContext',
    initialState,
    reducers: {
        setCurrentBook: (state, action: PayloadAction<IBook>) => {
            state.currentBook = {...action.payload}
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentBook } = bookContextSlice.actions

export default bookContextSlice.reducer
