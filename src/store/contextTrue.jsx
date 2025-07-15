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
    const [activeTheme, setActiveTheme] = useState(null)
    const [mode, setMode] = useState('view')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [serverActions, setServerActions] = useState({})

    const loadWords = async () => {
        setLoading(true)
        setError(null)

        try {
            const apiWords = await api.getWords()
            const apiThemes = {}

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

    const saveWords = async () => {
        if (!activeTheme) return
        const wordsToSave = words.filter(
            (word) => word.tags === activeTheme.name
        )
        console.log('🔍 saveWords — wordsToSave:', wordsToSave)
        console.log(
            '🔍 saveWords — serverActions перед отправкой:',
            serverActions
        )
        try {
            await api.sendWords(wordsToSave, serverActions)
            setServerActions({})
            setMode('view')
            console.log('Слова успешно сохранены')
        } catch (error) {
            console.error('Ошибка при сохранении:', error)
        }
    }

    const deleteWord = (id) => {
        const cleanCollection = words.filter((word) => word.id !== id)
        setServerActions((prev) => ({ ...prev, [id]: 'delete' }))
        setWords(cleanCollection)

        console.log(cleanCollection)
    }

    /** payload = {} */
    const editWord = (id, payload) => {
        // 1) Обновляем сам массив words
        setWords((prev) =>
            prev.map((w) =>
                w.id === id
                    ? { ...w, ...payload, tags_json: JSON.stringify([w.tags]) }
                    : w
            )
        )
        // 2) Ставим serverActions[id] = 'update', если это не новое слово
        setServerActions((prev) => {
            const next = { ...prev }
            if (next[id] !== 'add') {
                next[id] = 'update'
            }
            return next
        })
    }

    const addWord = (themeName) => {
        const newWord = {
            id: crypto.randomUUID(),
            english: '',
            transcription: '',
            russian: '',
            tags: themeName,
            tags_json: JSON.stringify([themeName]),
        }
        setWords((prev) => [...prev, newWord])
        setServerActions((prev) => ({ ...prev, [newWord.id]: 'add' }))
    }

    const deleteTheme = async (themeId) => {
        console.log(
            '🗑️ deleteTheme — все теги в словах:',
            words.map((w) => w.tags)
        )

        // 1) Собираем ID всех слов, подходящих под удаление темы
        const idsToDelete = words
            .filter(
                (w) =>
                    w.tags === themeId ||
                    (themeId === 'Без названия' && (!w.tags || w.tags === ''))
            )
            .map((w) => w.id)
        console.log(
            '🗑️ deleteTheme — idsToDelete после расширенного фильтра:',
            idsToDelete
        )

        if (idsToDelete.length === 0) {
            console.warn(
                '⚠️ deleteTheme — не найдено слов для удаления в теме',
                themeId
            )
        }

        // 2) Локально чистим words и themes
        setWords((prev) => prev.filter((w) => !idsToDelete.includes(w.id)))
        setThemes((prev) => prev.filter((t) => t.id !== themeId))

        // 3) Удаляем каждое слово на сервере
        try {
            await Promise.all(
                idsToDelete.map((id) => {
                    console.log(
                        `🗑️ deleteTheme — отправляем delete для слова ${id}`
                    )
                    return api
                        .sendWord({ id }, 'delete')
                        .then((res) =>
                            console.log(
                                `✅ deleteTheme — слово ${id} удалено`,
                                res
                            )
                        )
                        .catch((err) =>
                            console.error(
                                `❌ deleteTheme — ошибка при удалении ${id}`,
                                err
                            )
                        )
                })
            )
            console.log('✅ deleteTheme — все слова темы удалены на сервере')
        } catch (err) {
            console.error('❌ deleteTheme — общий catch:', err)
        }

        // 4) После успешного удаления можно перезагрузить данные, если нужно
        // await loadWords()
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

    const editTheme = (originalName, newName) => {
        // 1) Переименовываем тему в списке themes
        setThemes((prev) =>
            prev.map((theme) =>
                theme.id === originalName
                    ? { ...theme, id: newName, name: newName }
                    : theme
            )
        )

        // 2. Обновляем все слова этой темы, используя editWord
        words
            .filter((word) => word.tags === originalName)
            .forEach((word) => {
                editWord(word.id, {
                    tags: newName,
                    tags_json: JSON.stringify([newName]),
                })
            })
        // // Обновляем тему в словах
        // setWords((prev) =>
        //     prev.map((word) =>
        //         word.tags === originalName
        //             ? {
        //                   ...word,
        //                   tags: newName,
        //                   tags_json: JSON.stringify([newName]),
        //               }
        //             : word
        //     )
        // )

        // // Запускаяем простановку статуса словам
        // setServerActions((prev) => {
        //     const updated = { ...prev }
        //     words.forEach((word) => {
        //         if (word.tags === newName && updated[word.id] !== 'add') {
        //             updated[word.id] = 'update'
        //         }
        //     })
        //     return updated
        // })
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
                saveWords,
                themes,
                setThemes,
                deleteTheme,
                addTheme,
                saveTheme,
                editTheme,
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
