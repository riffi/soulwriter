import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICharacter} from "@entities/Character";

export interface ISceneFilters{
    searchStr: string
    character?: ICharacter
}

export interface SceneFiltersSlice {
    filters: ISceneFilters
}

const initialState: SceneFiltersSlice = {
    filters:{
        searchStr: ''
    }
}

export const sceneFiltersSlice = createSlice({
    name: 'sceneFilters',
    initialState,
    reducers: {
        setSceneFilters: (state, action: PayloadAction<ISceneFilters>) => {
            state.filters = {...action.payload}
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSceneFilters } = sceneFiltersSlice.actions

export default sceneFiltersSlice.reducer
