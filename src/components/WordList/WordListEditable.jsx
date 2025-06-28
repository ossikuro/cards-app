import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import WordCard from '../WordCard/WordCard'
import AddWordButton from '../WordAddNew/WordAddNew'
import {
    addWord,
    deleteWord,
    updateWord,
    setWords,
} from '../../store/themeSlice'
import './WordListEditable.scss'

const WordListEditable = ({ mode }) => {
    const dispatch = useDispatch()

    const words = useSelector((state) => {
        const activeTheme = state.themesStore.themes.find(
            (t) => t.id === state.themesStore.activeThemeId
        )
        return activeTheme?.words || []
    })

    // Добавляем 3 пустых слова, если список пуст
    useEffect(() => {
        if (mode === 'edit' && words.length === 0) {
            const emptyWords = Array.from({ length: 3 }, () => ({
                id: crypto.randomUUID(),
                word: '',
                transcription: '',
                translation: '',
            }))
            emptyWords.forEach((word) => dispatch(addWord(word)))
        }
    }, [mode, words.length, dispatch])

    // Очищаем пустые слова при выходе из edit
    useEffect(() => {
        if (mode !== 'edit') {
            const filtered = words.filter(
                (w) => w.word.trim() || w.translation.trim()
            )

            const isDifferent =
                filtered.length !== words.length ||
                filtered.some((w, i) => w.id !== words[i].id)

            if (isDifferent) {
                dispatch(setWords(filtered))
            }
        }
    }, [mode, words, dispatch])

    const handleDelete = (id) => {
        dispatch(deleteWord(id))
    }

    const handleAddWord = () => {
        const newWord = {
            id: crypto.randomUUID(),
            word: '',
            transcription: '',
            translation: '',
        }
        dispatch(addWord(newWord))
    }

    const handleChange = (id, newData) => {
        dispatch(updateWord({ id, newWord: newData }))
    }

    return (
        <div className="word_list_wrapper">
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
                    <WordCard key={wordData.id} index={idx} data={wordData} />
                )
            )}

            {mode === 'edit' && <AddWordButton onClick={handleAddWord} />}
        </div>
    )
}

export default WordListEditable
