import WordCard from '../WordCard/WordCard'
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import AddWordButton from '../WordAddNew/WordAddNew'
import './WordListEditable.scss'

const WordListEditable = ({ words = [], setWords, isEditing }) => {
    //функция обновить localstorage
    const updateStorage = (newWords) => {
        //запихиваем JSON в строку, localstorage жует только строки
        localStorage.setItem('words', JSON.stringify(newWords))
        //запускаем перерисовку карточек через родительское состояние
        setWords(newWords)
    }

    //удалить карточку
    const handleDelete = (idToDelete) => {
        const updatedWords = words.filter((word) => word.id !== idToDelete)
        updateStorage(updatedWords)
    }

    //добавить карточку, сгенерировать айдишник
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

    //обновляет карточку по id и сохраняет в localstrage
    const handleChange = (id, newData) => {
        const updatedWords = words.map((word) =>
            word.id === id ? { ...word, ...newData } : word
        )
        updateStorage(updatedWords)
    }

    //если массив не пустой, то мапим его. Если пустой - создаем 3 карточки пустые
    return (
        <div className="word_list_wrapper">
            {words.length > 0 ? (
                <>
                    {words.map((wordData, idx) =>
                        isEditing ? (
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
                    {isEditing && <AddWordButton onClick={handleAddWord} />}
                </>
            ) : (
                <>
                    <WordCardEditable />
                    <WordCardEditable />
                    <WordCardEditable />
                    {isEditing && <AddWordButton onClick={handleAddWord} />}
                </>
            )}
        </div>
    )
}

export default WordListEditable
