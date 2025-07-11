//хуки
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
//хранилка
import { WordsContext } from '../../store/wordsContext'
//компоненты
import WordList from '../../components/WordList/WordList.jsx'
import Controls from '../../components/Controls'
import Header from '../../components/Header/Header.jsx'
//картинки, иконки, стили
import BackButton from '../../assets/icons/chevron_left.svg?react'
import emptyImage from '../../assets/emptyImage.png'
import './Collection.scss'

const Collection = () => {
    const navigate = useNavigate()

    const {
        tags,
        setTags,
        activeTag,
        setActiveTag,
        setWords,
        words,
        setMode,
        mode,
    } = useContext(WordsContext)

    /** автовыбор первой темы как активной */
    useEffect(() => {
        if (!activeTag && tags.length > 0) {
            setActiveTag(tags[0])
        }
    }, [activeTag, tags])

    // локальное состояние имени темы
    const [themeName, setThemeName] = useState(activeTag || 'Без названия')
    useEffect(() => {
        setThemeName(activeTag || 'Без названия')
    }, [activeTag])

    // фильтрация слов по активной теме
    const filteredWords = words.filter(
        (word) =>
            // либо tags совпадает
            word.tags === activeTag ||
            // либо, если tags не задан, смотрим на legacy-поле tag
            word.tag === activeTag
    )

    const handleDelete = () => {
        setTags((prev) => prev.filter((tag) => tag !== activeTag))
        setWords((prev) => prev.filter((word) => word.tags !== activeTag))
        setActiveTag(null)
        navigate('/')
    }

    const handleSave = () => {
        console.log('Сохраняем тему:', activeTag, '→', themeName)
        setTags((prev) =>
            prev.map((tag) => (tag === activeTag ? themeName : tag))
        )
        setWords((prev) =>
            prev.map((word) =>
                word.tags === activeTag ? { ...word, tags: themeName } : word
            )
        )
        setActiveTag(themeName) // обновляем активную тему
        setMode('view')
    }

    // Отладочный эффект: вывод состояния после изменений
    useEffect(() => {
        console.log('--- Отладка состояния ---')
        console.log('activeTag:', activeTag)
        console.log('themeName:', themeName)
        console.log('words:', words)
        console.log('filteredWords:', filteredWords)
    }, [activeTag, themeName, words, filteredWords])

    return (
        <div className="Collection">
            {mode === 'edit' ? (
                <Header
                    menuItems={[
                        {
                            label: 'Просмотр слов',
                            onClick: () => setMode('view'),
                        },
                        {
                            label: 'Удалить тему',
                            onClick: handleDelete,
                        },
                    ]}
                >
                    <Controls.Button
                        variant="transparent_icon"
                        aria-label="Назад"
                        onClick={() => {
                            navigate('/collection')
                            setMode('view')
                        }}
                        icon={<BackButton />}
                    />

                    <Controls.Input
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                    />

                    <Controls.Button variant="black_txt" onClick={handleSave}>
                        Сохранить
                    </Controls.Button>
                </Header>
            ) : (
                <Header
                    menuItems={[
                        {
                            label: 'Редактировать',
                            onClick: () => setMode('edit'),
                        },
                        {
                            label: 'Удалить тему',
                            onClick: handleDelete,
                        },
                    ]}
                >
                    <Controls.Button
                        variant="transparent_icon"
                        aria-label="Назад"
                        onClick={() => navigate('/')}
                        icon={<BackButton />}
                    />

                    <div className="header_title_text">
                        {themeName}
                        <div className="header_title_wordsCounter">
                            {filteredWords.length} слов
                        </div>
                    </div>

                    <Controls.Button
                        variant="black_txt"
                        onClick={() => {
                            setMode('training')
                            navigate('/training')
                        }}
                    >
                        Тренировать
                    </Controls.Button>
                </Header>
            )}

            <div className="EditThemePage_ContentWrapper">
                {mode === 'view' && filteredWords.length === 0 ? (
                    <div className="collection_empty">
                        <img
                            src={emptyImage}
                            alt="Нет слов"
                            className="collection_empty_image"
                        />
                        <p className="collection_empty_text">
                            Здесь пока нет слов 🙈
                        </p>
                    </div>
                ) : (
                    <WordList tag={activeTag} />
                )}
            </div>
        </div>
    )
}

export default Collection
