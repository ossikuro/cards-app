import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

const initialState = {
    themes: [
        {
            id: nanoid(),
            name: 'Список слов',
            tags: '',
            tags_json: '',
            words: [],
        },
    ],
    activeThemeId: null,
}

const loadWordsFromServer = () => async (dispatch) => {
    try {
        const response = await fetch(
            'http://itgirlschool.justmakeit.ru/api/words'
        )
        const data = await response.json()

        const themesMap = {}

        data.forEach((word) => {
            const tags = word.tags
            if (!themesMap[tags]) {
                themesMap[tags] = []
            }
            themesMap[tags].push(word)
        })
        const groupedThemes = Object.entries(themesMap).map(
            ([tags, words]) => ({
                id: nanoid(),
                name: tags || 'Без названия',
                tags: tags,
                tags_json: '', // если хочешь позже использовать — пусть будет
                words: words,
            })
        )

        dispatch(setFetchedThemes(groupedThemes))
    } catch (error) {
        console.error('Ошибка загрузки слов с сервера:', error)
    }
}

const saveWordsToServer = (words) => async (dispatch) => {
    try {
        const response = await fetch(
            'http://itgirlschool.justmakeit.ru/api/words/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(words),
            }
        )

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`)
        }

        const result = await response.json()
        console.log('✅ Успешно отправлено на сервер:', result)
    } catch (error) {
        console.error('❌ Ошибка при отправке на сервер:', error)
    }
}

const themeSlice = createSlice({
    name: 'themesStore',
    initialState,
    reducers: {
        setFetchedThemes: (state, action) => {
            state.themes = action.payload
            if (!state.activeThemeId && action.payload.length > 0) {
                state.activeThemeId = action.payload[0].id
            }
        },
        addTheme: (state, action) => {
            const tags = action.payload
            state.themes.push({
                id: nanoid(),
                name: tags,
                tags: tags,
                tags_json: '', // ⬅ оставляем пустым
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
                theme.tags = action.payload.name // 👈 синхронизируем с name
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
                const wordWithTag = {
                    ...action.payload,
                    tags: theme.tags,
                    tags_json: '',
                }
                theme.words.push(wordWithTag)
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
    setFetchedThemes,
} = themeSlice.actions

export { loadWordsFromServer, saveWordsToServer }

export default themeSlice.reducer
