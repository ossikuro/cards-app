import { createContext, useState } from 'react'
import * as api from './apiConnection.js'

export const AppContext = createContext()

const initialState = {
    themes: [
        {
            id: crypto.randomUUID(),
            name: 'Список слов',
            tags: '',
            tags_json: '',
            words: [],
            serverActions: {},
        },
    ],
    activeThemeId: null,
}

export const ContextProvider = ({ children }) => {
    const [words, setWords] = useState([])
    const [themes, setThemes] = useState([])
    const [activeTheme, setActiveTheme] = useState('')
    const [mode, setMode] = useState('view')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadWords = async () => {
        setLoading(true)
        setError(null)

        try {
            console.log('Запрос к API начинается')
            const apiWords = await api.getWords()
            const apiThemes = {}

            console.log('Данные с API:', apiWords)

            // собираем названия тем
            apiWords.forEach((word) => {
                const theme = word.tags || 'Без названия'

                if (!apiThemes[theme]) {
                    apiThemes[theme] = []
                }
                apiThemes[theme].push(word)
            })

            // Формируем массив тем с нужной структурой
            const groupedThemes = Object.entries(apiThemes).map(
                ([tags, words]) => ({
                    id: tags,
                    name: tags,
                    words: words,
                    serverActions: {}, // для отслеживания изменений на сервере
                })
            )
            // Обновляем состояние тем и слов
            setThemes(groupedThemes)
            setWords(apiWords)
        } catch (err) {
            console.error('Ошибка в loadWords:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteWord = (id) => {
        const cleanCollection = words.filter((word) => word.id !== id)
        setWords(cleanCollection)
    }

    /** payload = {} */
    const editWord = (id, payload) => {
        const cleanCollection = words.map((word) => {
            if (word.id === id) {
                return { ...payload, id }
            } else {
                return word
            }
        })
        setWords(cleanCollection)
    }

    const addWord = (theme) => {
        const newWord = {
            id: crypto.randomUUID(),
            english: '',
            transcription: '',
            russian: '',
            tags: theme,
            tags_json: JSON.stringify([theme]),
        }
        const cleanCollection = [...words, newWord]
        setWords(cleanCollection)
    }

    const deleteTheme = (themeId) => {
        setWords((prev) => prev.filter((word) => word.tags !== themeId))
        setThemes((prev) => prev.filter((theme) => theme.id !== themeId))
    }

    const addTheme = () => {
        const baseName = 'Новая тема'
        const names = themes.map((t) => t.name) // было t.themeName
        const sameNames = names.filter((n) => n && n.startsWith(baseName)) // добавил проверку n

        const newName = sameNames.length
            ? `${baseName} ${sameNames.length + 1}`
            : baseName

        const newTheme = {
            id: newName,
            name: newName, // было themeName
        }
        setThemes((prev) => [...prev, newTheme])
    }

    const saveTheme = () => {
        if (!activeTheme) {
            console.warn('Нет активной темы')
            return
        }

        const preparedWords = activeTheme.words
            .filter((word) => word.english.trim() && word.russian.trim())
            .map(
                ({ id, english, transcription, russian, tags, tags_json }) => ({
                    id,
                    english: english.trim(),
                    transcription: transcription.trim(),
                    russian: russian.trim(),
                    tags,
                    tags_json,
                })
            )
        console.log('🎯 preparedWords', preparedWords)
        console.log(
            '📦 JSON.stringify:',
            JSON.stringify(preparedWords, null, 2)
        )

        console.log('Отправляем на сервер:', preparedWords)
        dispatch(saveWordsToServer(preparedWords, activeTheme.serverActions))
        dispatch(setScreenState('view'))
    }

    return (
        <AppContext.Provider
            value={{
                words,
                setWords,
                deleteWord,
                editWord,
                addWord,
                loadWords,
                themes,
                setThemes,
                deleteTheme,
                addTheme,
                saveTheme,
                activeTheme,
                setActiveTheme,
                mode,
                setMode,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
