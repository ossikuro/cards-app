import { useEffect, useState, useRef } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

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
        setThemes,
        activeTheme,
        setActiveTheme,
        deleteTheme,
        editTheme,
        saveTheme,
        words,
        setWords,
        mode,
        setMode,
        serverActions,
        //saveWords,
    } = useContext(AppContext)

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

    // Реф для хранения оригинального имени
    const originalName = useRef(activeTheme?.name)

    // замена названия активной темы
    useEffect(() => {
        setThemeName(activeTheme?.name || 'Без названия')
    }, [activeTheme])

    // фильтрация слов по активной теме
    const filteredWords = words.filter(
        (word) =>
            word.tags === activeTheme?.name &&
            serverActions[word.id] !== 'delete'
    )
    // фактическое сохранение
    useEffect(() => {
        if (mode === 'pendingSave') {
            ;(async () => {
                await saveTheme()
                setMode('view')
            })()
        }
    }, [mode, words, themes, activeTheme, serverActions])

    const handleDelete = () => {
        if (activeTheme) {
            deleteTheme(activeTheme.name)
            setActiveTheme(null)
            navigate('/')
        }
    }

    const handleSave = () => {
        if (themeName.trim() && activeTheme && activeTheme.name !== themeName) {
            editTheme(activeTheme.name, themeName)
        }

        setThemes((prev) =>
            prev.map((theme) =>
                theme.id === activeTheme.id
                    ? { ...theme, name: themeName, id: themeName }
                    : theme
            )
        )
        setWords((prev) =>
            prev.map((word) =>
                word.tags === activeTheme.name
                    ? { ...word, tags: themeName }
                    : word
            )
        )
        setActiveTheme((prev) => ({ ...prev, name: themeName, id: themeName }))
        setMode('pendingSave')
    }

    // useEffect(() => {
    //     void saveWords()
    // }, [words])

    // ====== ОТЛАДОЧНЫЙ БЛОК ======

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
                    <WordList
                        words={filteredWords}
                        themeName={activeTheme?.name}
                    />
                )}
            </div>
        </div>
    )
}

export default Collection
