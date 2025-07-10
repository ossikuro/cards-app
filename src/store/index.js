import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import screenReducer from './themeScreenSlice'

export const store = configureStore({
    reducer: {
        themesStore: themeReducer,
        screenState: screenReducer,
    },
})
