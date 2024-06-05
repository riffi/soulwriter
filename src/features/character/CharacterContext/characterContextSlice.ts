import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICharacterGroup} from "@entities/Character";

export interface CharacterContextSlice {
    currentGroup?: ICharacterGroup
}

const initialState: CharacterContextSlice = {

}

export const characterContextSlice = createSlice({
    name: 'bookContext',
    initialState,
    reducers: {
        setCurrentCharacterGroup: (state, action: PayloadAction<ICharacterGroup>) => {
            state.currentGroup = {...action.payload}
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentCharacterGroup } = characterContextSlice.actions

export default characterContextSlice.reducer
