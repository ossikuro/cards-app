//хуки
import { useEffect, useContext, useRef } from 'react'
//хранилка

//компоненты
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import WordCard from '../WordCard/WordCard'
import AddWordButton from '../WordAddNew/WordAddNew'
//картинки, иконки, стили
import './WordList.scss'
import { AppContext } from '../../store/contextTrue'

const WordList = ({ themeName }) => {
    const { words, setWords, addWord, editWord, deleteWord, mode } =
        useContext(AppContext)

    const filteredWords = words.filter((word) => word.tags === themeName)

    const wasEmptyInit = useRef(false) // для слежки за количеством карточек на странице

    //добавляем 3 пустые карточки, если  статус страницы редактирование + массив пустой + нет флажка больше не добавлять
    useEffect(() => {
        if (
            mode === 'edit' &&
            filteredWords.length === 0 &&
            !wasEmptyInit.current
        ) {
            addWord(themeName)
            addWord(themeName)
            addWord(themeName)
            wasEmptyInit.current = true
        }
        // Сбросить флаг, если вышли из edit-режима
        if (mode !== 'edit') {
            wasEmptyInit.current = false
        }
    }, [mode, filteredWords, themeName])

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
        console.log(words)
    }, [words])

    const handleChange = (id, newData) => {
        editWord(id, newData)
    }

    return (
        <div className="word_list_wrapper">
            {filteredWords.map((wordData, idx) =>
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
