import { createContext, useContext, useState, useEffect } from 'react'

const WordsContext = createContext()

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([])
    const [tags, setTags] = useState('') // текущая выбранная тема
    const [mode, setMode] = useState('edit') // режим отображения: 'edit' или 'view'

    useEffect(() => {
        const storedWords = localStorage.getItem('words')
        const storedTags = localStorage.getItem('tags')
        const storedMode = localStorage.getItem('mode')

        if (storedWords) setWords(JSON.parse(storedWords))
        if (storedTags) setTags(storedTags)
        if (storedMode) setMode(storedMode)
    }, [])

    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words))
    }, [words])

    useEffect(() => {
        localStorage.setItem('tags', tags)
    }, [tags])

    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [mode])

    const createEmptyWord = () => ({
        id: crypto.randomUUID(),
        english: '',
        transcription: '',
        russian: '',
        tags: tags,
        tags_json: '',
    })

    const addWord = () => {
        setWords((prev) => [...prev, createEmptyWord()])
    }

    const deleteWord = (idToDelete) => {
        setWords((prev) => prev.filter((word) => word.id !== idToDelete))
    }

    const updateWord = (id, updatedData) => {
        setWords((prev) =>
            prev.map((word) =>
                word.id === id ? { ...word, ...updatedData } : word
            )
        )
    }

    const clearEmptyCards = () => {
        setWords((prev) =>
            prev.filter(
                (word) =>
                    word.english.trim() !== '' || word.russian.trim() !== ''
            )
        )
    }

    const updateTags = (newTags) => {
        setTags(newTags)
    }

    const getAllTags = () => {
        const tagSet = new Set()
        words.forEach((word) => {
            if (word.tags) tagSet.add(word.tags)
        })
        return Array.from(tagSet)
    }

    const deleteTag = (tagToDelete) => {
        setWords((prev) => prev.filter((word) => word.tags !== tagToDelete))
        if (tags === tagToDelete) setTags('')
    }

    const renameTag = (oldTag, newTag) => {
        setWords((prev) =>
            prev.map((word) =>
                word.tags === oldTag ? { ...word, tags: newTag } : word
            )
        )
        if (tags === oldTag) setTags(newTag)
    }

    const getWordsForTag = (tagName) => {
        return words.filter((word) => word.tags === tagName)
    }

    return (
        <WordsContext.Provider
            value={{
                words,
                tags,
                mode,
                setMode,
                addWord,
                deleteWord,
                updateWord,
                clearEmptyCards,
                updateTags,
                getAllTags,
                deleteTag,
                renameTag,
                getWordsForTag,
            }}
        >
            {children}
        </WordsContext.Provider>
    )
}

export const useWords = () => useContext(WordsContext)
