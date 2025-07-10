import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialThemeScreen = {
    screenState: 'view',
}

const themeScreenSlice = createSlice({
    name: 'screenState',
    initialState: initialThemeScreen,
    reducers: {
        setScreenState(state, action) {
            state.screenState = action.payload
        },
    },
})

export const { setScreenState } = themeScreenSlice.actions

export default themeScreenSlice.reducer
