//хуки
import { useEffect } from 'react'
import { useContext } from 'react'
//хранилка
import { WordsContext } from '../../store/wordsContext'
//компоненты
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import WordCard from '../WordCard/WordCard'
import AddWordButton from '../WordAddNew/WordAddNew'
//картинки, иконки, стили
import './WordList.scss'
import { AppContext } from '../../store/contextTrue'

const WordList = ({ themeName }) => {
    const { words, setWords, mode, createEmptyWord } = useContext(WordsContext)

    const {
        words: targetWordsList,
        addWord,
        editWord,
        deleteWord,
    } = useContext(AppContext)

    //добавляем 3 пустые карточки, если  статус страницы редактирование + массив пустой + нет флажка больше не добавлять
    useEffect(() => {
        if (mode === 'edit' && targetWordsList.length === 0) {
            addWord(themeName)
            addWord(themeName)
            addWord(themeName)
        }
    }, [mode, targetWordsList, themeName])

    // Очищаем пустые слова при выходе из edit
    useEffect(() => {
        if (mode !== 'edit') {
            const filtered = words.filter(
                (w) => w.english.trim() || w.russian.trim()
            )

            const isDifferent =
                filtered.length !== words.length ||
                filtered.some((w, i) => w.id !== words[i].id)

            if (isDifferent) {
                setWords(filtered)
            }
        }
    }, [mode, words])

    const handleDelete = (id) => {
        deleteWord(id)
    }

    const handleAddWord = () => {
        addWord(themeName)
    }

    useEffect(() => {
        console.log(targetWordsList)
    }, [targetWordsList])

    const handleChange = (id, newData) => {
        editWord(id, newData)
    }

    return (
        <div className="word_list_wrapper">
            {targetWordsList.map((wordData, idx) =>
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
                    <WordCard key={wordData.id} index={idx} data={wordData} />
                )
            )}

            {mode === 'edit' && <AddWordButton onClick={handleAddWord} />}
        </div>
    )
}

export default WordList
