import { useState } from 'react'
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import AddWordButton from '../WordAddNew/WordAddNew'
import './WordListEditable.scss'

const WordListEditable = () => {
    const [words, setWords] = useState(() => {
        const stored = localStorage.getItem('words')
        return stored ? JSON.parse(stored) : []
    })

    const updateStorage = (newWords) => {
        localStorage.setItem('words', JSON.stringify(newWords))
        setWords(newWords)
    }

    const handleDelete = (indexToDelete) => {
        const updatedWords = words.filter((_, i) => i !== indexToDelete)
        updateStorage(updatedWords)
    }

    const handleAddWord = () => {
        const newWord = { word: '', transcription: '', translation: '' }
        const updatedWords = [...words, newWord]
        updateStorage(updatedWords)
    }

    return (
        <div className="word_list_wrapper">
            {words.length > 0 ? (
                <>
                    {words.map((wordData, idx) => (
                        <WordCardEditable
                            key={idx}
                            index={idx}
                            data={wordData}
                            onChange={(newData) => {
                                const updated = [...words]
                                updated[idx] = newData
                                updateStorage(updated)
                            }}
                            onDelete={() => handleDelete(idx)}
                        />
                    ))}
                    <AddWordButton onClick={handleAddWord} />
                </>
            ) : (
                <>
                    <WordCardEditable />
                    <WordCardEditable />
                    <WordCardEditable />
                    <AddWordButton onClick={handleAddWord} />
                </>
            )}
        </div>
    )
}

export default WordListEditable
