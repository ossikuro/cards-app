import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { WordsContext } from '../../store/wordsContext'
import { AppContext } from '../../store/contextTrue'

import WordList from '../../components/WordList/WordList.jsx'
import Controls from '../../components/Controls'
import Header from '../../components/Header/Header.jsx'

import BackButton from '../../assets/icons/chevron_left.svg?react'
import emptyImage from '../../assets/emptyImage.png'
import './Collection.scss'

const Collection = () => {
    const navigate = useNavigate()

    const {
        themes,
        activeTheme,
        setActiveTheme,
        deleteTheme,
        words,
        mode,
        setMode,
    } = useContext(AppContext)

    const { setTags, activeTag, setActiveTag, setWords } =
        useContext(WordsContext)

    /** автовыбор первой темы как активной */
    useEffect(() => {
        if (!activeTheme && themes.length > 0) {
            setActiveTheme(themes[0])
        }
    }, [activeTheme, themes])

    // локальное состояние имени темы
    const [themeName, setThemeName] = useState(
        activeTheme?.name || 'Без названия'
    )

    useEffect(() => {
        setThemeName(activeTheme?.name || 'Без названия')
    }, [activeTheme])

    // фильтрация слов по активной теме
    const filteredWords = words.filter(
        (word) => word.tags === activeTheme?.name
    )

    const handleDelete = () => {
        if (activeTheme) {
            deleteTheme(activeTheme.name)
            setActiveTheme(null)
            navigate('/')
        }
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

    // ====== ОТЛАДОЧНЫЙ БЛОК ======
    useEffect(() => {
        console.log('--- ОТЛАДКА ---')
        if (!words || words.length === 0) {
            console.log('СЛОВА: массив пустой или не загружен')
        } else {
            console.log('СЛОВА (первые 3):', words.slice(0, 3))
            words.slice(0, 3).forEach((w, i) => {
                console.log(`Слово[${i}]:`, w)
            })
        }

        if (!themes || themes.length === 0) {
            console.log('ТЕМЫ: массив пустой или не загружен')
        } else {
            console.log('ТЕМЫ (первые 3):', themes.slice(0, 3))
            themes.slice(0, 3).forEach((t, i) => {
                console.log(`Тема[${i}]:`, t)
            })
        }

        if (!activeTheme) {
            console.log('activeTheme: НЕ выбран!')
        } else {
            console.log('activeTheme:', activeTheme)
        }

        // Проверка совпадений для фильтрации
        if (activeTheme && words && words.length > 0) {
            const sampleWord = words.find(
                (w) => w.tags === activeTheme.name || w.tags === activeTheme.id
            )
            if (sampleWord) {
                console.log('СОВПАДЕНИЕ найдено:', sampleWord)
            } else {
                console.log(
                    'Нет ни одного слова с tags ===',
                    activeTheme.name,
                    'или',
                    activeTheme.id
                )
            }
        }

        console.log('filteredWords.length:', filteredWords.length)
        if (filteredWords.length > 0) {
            console.log('filteredWords[0]:', filteredWords[0])
        }
    }, [words, themes, activeTheme, filteredWords])
    // ====== КОНЕЦ ОТЛАДОЧНОГО БЛОКА ======

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
                            navigate('/Collection')
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
                    <WordList themeName={activeTheme?.name} />
                )}
            </div>
        </div>
    )
}

export default Collection
