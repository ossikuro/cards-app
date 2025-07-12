import { createContext, useState } from 'react'

export const AppContext = createContext()

export const ContextProvider = ({ children }) => {
    const [words, setWords] = useState([])
    const [themes, setThemes] = useState([])
    const [mode, setMode] = useState('view')

    useEffect(() => {
        fetch('https://itgirlschool.justmakeit.ru/api/words')
    })

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
        const names = themes.map((t) => t.themeName)
        const sameNames = names.filter((n) => n.startsWith(baseName))

        const newName = sameNames.length
            ? `${baseName} ${sameNames.length + 1}`
            : baseName

        const newTheme = {
            id: crypto.randomUUID(),
            themeName: newName,
        }
        setThemes((prev) => [...prev, newTheme])
    }

    return (
        <AppContext
            value={{
                words,
                setWords,
                deleteWord,
                editWord,
                addWord,
                themes,
                setThemes,
                deleteTheme,
                addTheme,
                mode,
                setMode,
            }}
        >
            {children}
        </AppContext>
    )
}
