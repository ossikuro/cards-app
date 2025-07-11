import { createContext, useState } from 'react'

export const AppContext = createContext()

export const ContextProvider = ({ children }) => {
    const [words, setWords] = useState([])

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

    return (
        <AppContext value={{ words, deleteWord, editWord, addWord }}>
            {children}
        </AppContext>
    )
}
