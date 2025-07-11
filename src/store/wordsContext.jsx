import { createContext, useContext, useState, useEffect } from 'react'

export const WordsContext = createContext()

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([])
    const [tags, setTags] = useState([]) // массив тем
    const [mode, setMode] = useState('edit') // режим: edit | view
    const [activeTag, setActiveTag] = useState('') // активная тема

    // Загрузка из localStorage
    useEffect(() => {
        const storedWords = localStorage.getItem('words')
        const storedTags = localStorage.getItem('tags')
        const storedMode = localStorage.getItem('mode')
        const storedActiveTag = localStorage.getItem('activeTag')

        if (storedWords) setWords(JSON.parse(storedWords))
        if (storedTags) {
            try {
                const parsedTags = JSON.parse(storedTags)
                if (Array.isArray(parsedTags)) {
                    setTags(parsedTags)
                }
            } catch (e) {
                console.error('Ошибка при разборе tags из localStorage', e)
            }
        }
        if (storedMode) setMode(storedMode)
        if (storedActiveTag) setActiveTag(storedActiveTag)
    }, [])

    // Сохранение в localStorage
    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words))
    }, [words])

    useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(tags))
    }, [tags])

    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [mode])

    useEffect(() => {
        localStorage.setItem('activeTag', activeTag)
    }, [activeTag])

    return (
        <WordsContext.Provider
            value={{
                words,
                setWords,
                tags,
                setTags,
                mode,
                setMode,
                activeTag,
                setActiveTag,
            }}
        >
            {children}
        </WordsContext.Provider>
    )
}
