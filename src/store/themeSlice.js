import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

const initialState = {
    themes: [
        {
            id: nanoid(),
            name: 'Список слов',
            tags: '',
            tags_json: '',
            words: [],
            serverActions: {},
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
                serverActions: {},
            })
        )

        dispatch(setFetchedThemes(groupedThemes))
    } catch (error) {
        console.error('Ошибка загрузки слов с сервера:', error)
    }
}

const saveWordsToServer = (words, serverActions) => async (dispatch) => {
    await Promise.all(
        words.map(async (word) => {
            switch (serverActions[word.id]) {
                case 'add': {
                    try {
                        const response = await fetch(
                            'http://itgirlschool.justmakeit.ru/api/words/add',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(word),
                            }
                        )

                        if (!response.ok) {
                            throw new Error(`Ошибка: ${response.status}`)
                        }

                        const result = await response.json()
                        console.log('✅ Успешно отправлено на сервер:', result)
                    } catch (error) {
                        console.error(
                            '❌ Ошибка при отправке на сервер:',
                            error
                        )
                    }
                    break
                }

                case 'update': {
                    try {
                        const response = await fetch(
                            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(word),
                            }
                        )

                        if (!response.ok) {
                            throw new Error(`Ошибка: ${response.status}`)
                        }

                        const result = await response.json()
                        console.log('✅ Успешно отправлено на сервер:', result)
                    } catch (error) {
                        console.error(
                            '❌ Ошибка при отправке на сервер:',
                            error
                        )
                    }
                    break
                }
                case 'delete': {
                    try {
                        const response = await fetch(
                            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(word),
                            }
                        )

                        if (!response.ok) {
                            throw new Error(`Ошибка: ${response.status}`)
                        }

                        const result = await response.json()
                        console.log('✅ Успешно отправлено на сервер:', result)
                    } catch (error) {
                        console.error(
                            '❌ Ошибка при отправке на сервер:',
                            error
                        )
                    }
                    break
                }
                default:
                    break
            }
        })
    )
}

const themeSlice = createSlice({
    name: 'themesStore',
    initialState,
    reducers: {
        resetServerActions: (state) => {
            const activeTheme = state.themes.findIndex(
                (item) => item.id === state.activeThemeId
            )
            state.themes[activeTheme].serverActions = {}
        },

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
                serverActions: {},
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
                theme.words = theme.words.map((word) => {
                    if (
                        theme.serverActions?.[word.id] !== 'add' &&
                        theme.serverActions?.[word.id] !== 'delete'
                    ) {
                        theme.serverActions[word.id] = 'update'
                    }
                    return {
                        ...word,
                        tags: action.payload.name,
                        tags_json: JSON.stringify([action.payload.name]),
                    }
                })
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
                    tags: theme.name,
                    tags_json: JSON.stringify(theme.name),
                }
                theme.words.push(wordWithTag)
                theme.serverActions[action.payload.id] = 'add'
            }
        },
        updateWord: (state, action) => {
            const { id, newWord } = action.payload
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                const index = theme.words.findIndex((w) => w.id === id)
                if (index !== -1) {
                    theme.words[index] = newWord
                    if (theme.serverActions[id] !== 'add') {
                        theme.serverActions[id] = 'update'
                    }
                }
            }
        },
        deleteWord: (state, action) => {
            const theme = state.themes.find((t) => t.id === state.activeThemeId)
            if (theme) {
                theme.words = theme.words.filter((w) => w.id !== action.payload)
                if (theme.serverActions[id] !== 'add') {
                    theme.serverActions[action.payload.id] = 'delete'
                }
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
