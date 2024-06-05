import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ISceneContext{
    sceneId: number
    scrollPosition: number
}
export interface SceneContextSlice {
    sceneContextList: ISceneContext[]
}

const initialState: SceneContextSlice = {
    sceneContextList: []
}

export const sceneContextSlice = createSlice({
    name: 'sceneContext',
    initialState,
    reducers: {
        setSceneContext: (state, action: PayloadAction<ISceneContext>) => {
            const existingContext = state.sceneContextList.find(
                (sc) => sc.sceneId === action.payload.sceneId
            )
            if (existingContext){
                existingContext.scrollPosition = action.payload.scrollPosition
            }
            else{
                state.sceneContextList.push(action.payload)
            }
            return state
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSceneContext } = sceneContextSlice.actions

export default sceneContextSlice.reducer
