import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    themes: [
        {
            id: nanoid(),
            name: 'Список слов',
            words: [],
        },
    ],
    activeThemeId: null,
}

const themeSlice = createSlice({
    name: 'themesStore',
    initialState,
    reducers: {
        addTheme: (state, action) => {
            state.themes.push({
                id: nanoid(),
                name: action.payload,
                words: [],
            })
        },
        deleteTheme: (state, action) => {
            state.themes = state.themes.filter((t) => t.id !== action.payload)
            if (state.activeThemeId === action.payload) {
                state.activeThemeId = null
            }
        },
        setActiveTheme: (state, action) => {
            state.activeThemeId = action.payload
        },
        renameTheme: (state, action) => {
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                theme.name = action.payload.name
            }
        },
        setWords: (state, action) => {
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                theme.words = action.payload
            }
        },
        addWord: (state, action) => {
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                theme.words.push(action.payload)
            }
        },
        updateWord: (state, action) => {
            const { id, newWord } = action.payload
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                const index = theme.words.findIndex((w) => w.id === id)
                if (index !== -1) {
                    theme.words[index] = newWord
                }
            }
        },
        deleteWord: (state, action) => {
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                theme.words = theme.words.filter((w) => w.id !== action.payload)
            }
        },
    },
})

export const {
    addTheme,
    deleteTheme,
    setActiveTheme,
    renameTheme,
    setWords,
    addWord,
    updateWord,
    deleteWord,
} = themeSlice.actions

export default themeSlice.reducer
