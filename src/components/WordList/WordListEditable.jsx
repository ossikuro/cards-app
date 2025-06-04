import WordCardEditable from '../WordCardEditable/WordCardEditable'
import WordCard from '../WordCard/WordCard'
import AddWordButton from '../WordAddNew/WordAddNew'
import './WordListEditable.scss'

const WordListEditable = ({ words = [], setWords, mode }) => {
    const updateStorage = (newWords) => {
        localStorage.setItem('words', JSON.stringify(newWords))
        setWords(newWords)
    }

    const handleDelete = (idToDelete) => {
        const updatedWords = words.filter((word) => word.id !== idToDelete)
        updateStorage(updatedWords)
    }

    const handleAddWord = () => {
        const newWord = {
            id: crypto.randomUUID(),
            word: '',
            transcription: '',
            translation: '',
        }
        const updatedWords = [...words, newWord]
        updateStorage(updatedWords)
    }

    const handleChange = (id, newData) => {
        const updatedWords = words.map((word) =>
            word.id === id ? { ...word, ...newData } : word
        )
        updateStorage(updatedWords)
    }

    return (
        <div className="word_list_wrapper">
            {words.length > 0 ? (
                <>
                    {words.map((wordData, idx) =>
                        mode === 'edit' ? (
                            <WordCardEditable
                                key={wordData.id}
                                index={idx}
                                data={wordData}
                                onChange={(newData) =>
                                    handleChange(wordData.id, newData)
                                }
                                onDelete={() => handleDelete(wordData.id)}
                            />
                        ) : (
                            <WordCard
                                key={wordData.id}
                                index={idx}
                                data={wordData}
                            />
                        )
                    )}
                </>
            ) : (
                <>
                    {mode === 'edit' && (
                        <>
                            <WordCardEditable />
                            <WordCardEditable />
                            <WordCardEditable />
                        </>
                    )}
                </>
            )}
            {mode === 'edit' && <AddWordButton onClick={handleAddWord} />}
        </div>
    )
}

export default WordListEditable
