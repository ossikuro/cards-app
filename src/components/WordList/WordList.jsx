//хуки
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//компоненты
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import WordCard from '../WordCard/WordCard'
import AddWordButton from '../WordAddNew/WordAddNew'
//редьюсеры
import {
    addWord,
    deleteWord,
    updateWord,
    setWords,
} from '../../store/themeSlice'
//картинки, иконки, стили
import './WordList.scss'

const WordList = () => {
    const dispatch = useDispatch()

    const mode = useSelector((state) => state.screenState.screenState)
    const words = useSelector((state) => {
        const activeTheme = state.themesStore.themes.find(
            (t) => t.id === state.themesStore.activeThemeId
        )
        return activeTheme?.words || []
    })

    const addedInitialWords = useRef(false)

    //добавляем 3 пустые карточки, если  статус страницы редактирование + массив пустой + нет флажка больше не добавлять
    useEffect(() => {
        if (
            mode === 'edit' &&
            words.length === 0 &&
            !addedInitialWords.current
        ) {
            const emptyWords = Array.from({ length: 3 }, () => ({
                id: crypto.randomUUID(),
                english: '',
                transcription: '',
                russian: '',
            }))
            emptyWords.forEach((word) => dispatch(addWord(word)))
            addedInitialWords.current = true // поднимаем флажок - запрет на добавление слов
        }
    }, [mode, words.length, dispatch])

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
                dispatch(setWords(filtered))
            }
        }
    }, [mode, words, dispatch])

    const handleDelete = (id) => {
        dispatch(deleteWord(id))
    }

    const theme = useSelector((state) =>
        state.themesStore.themes.find(
            (t) => t.id === state.themesStore.activeThemeId
        )
    )

    const handleAddWord = () => {
        const newWord = {
            id: crypto.randomUUID(),
            english: '',
            transcription: '',
            russian: '',
            tags: theme?.tag || '',
            tags_json: '',
        }
        dispatch(addWord(newWord))
        console.log('Добавлено слово:', newWord) // 👈 сюда
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

export default WordList
