// хуки
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// компоненты
import WordList from '../../components/WordList/WordList.jsx'
import Controls from '../../components/Controls'
import Header from '../../components/Header/Header.jsx'
// редьюсеры
import {
    setActiveTheme,
    renameTheme,
    deleteTheme,
    setWords,
    saveWordsToServer,
} from '../../store/themeSlice'
import { setScreenState } from '../../store/themeScreenSlice'
// стили и картинки
import BackButton from '../../assets/icons/chevron_left.svg?react'
import emptyImage from '../../assets/emptyImage.png'
import './Collection.scss'

const Collection = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mode = useSelector((state) => state.screenState.screenState)
    const themes = useSelector((state) => state.themesStore.themes)
    const activeThemeId = useSelector(
        (state) => state.themesStore.activeThemeId
    )
    const activeTheme = useSelector((state) =>
        state.themesStore.themes.find((t) => t.id === activeThemeId)
    )
    const words = activeTheme?.words || []

    useEffect(() => {
        if (!activeThemeId && themes.length > 0) {
            dispatch(setActiveTheme(themes[0].id))
        }
    }, [activeThemeId, themes, dispatch])

    const handleDelete = () => {
        dispatch(deleteTheme(activeThemeId))
        navigate('/')
    }

    const handleSave = () => {
        if (!activeTheme) {
            console.warn('Нет активной темы')
            return
        }

        const preparedWords = activeTheme.words
            .filter((word) => word.english.trim() && word.russian.trim())
            .map(
                ({ id, english, transcription, russian, tags, tags_json }) => ({
                    id,
                    english: english.trim(),
                    transcription: transcription.trim(),
                    russian: russian.trim(),
                    tags,
                    tags_json,
                })
            )
        console.log('🎯 preparedWords', preparedWords)
        console.log(
            '📦 JSON.stringify:',
            JSON.stringify(preparedWords, null, 2)
        )

        console.log('Отправляем на сервер:', preparedWords)
        dispatch(saveWordsToServer(preparedWords, activeTheme.serverActions))
        dispatch(setScreenState('view'))
    }

    return (
        <div className="Collection">
            {mode === 'edit' ? (
                <Header
                    menuItems={[
                        {
                            label: 'Просмотр слов',
                            onClick: () => dispatch(setScreenState('view')),
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
                            dispatch(setScreenState('view'))
                        }}
                        icon={<BackButton />}
                    />

                    <Controls.Input
                        value={activeTheme?.name}
                        onChange={(e) =>
                            dispatch(
                                renameTheme({
                                    id: activeThemeId,
                                    name: e.target.value,
                                })
                            )
                        }
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
                            onClick: () => dispatch(setScreenState('edit')),
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
                        {activeTheme?.name || 'Без названия'}
                        <div className="header_title_wordsCounter">
                            {words.length} слов
                        </div>
                    </div>

                    <Controls.Button
                        variant="black_txt"
                        onClick={() => {
                            dispatch(setScreenState('training'))
                            navigate('/training')
                        }}
                    >
                        Тренировать
                    </Controls.Button>
                </Header>
            )}

            <div className="EditThemePage_ContentWrapper">
                {mode === 'view' && words.length === 0 ? (
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
                    <WordList />
                )}
            </div>
        </div>
    )
}

export default Collection
