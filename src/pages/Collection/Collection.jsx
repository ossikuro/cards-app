import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WordListEditable from '../../components/WordList/WordListEditable.jsx'
import Controls from '../../components/Controls'
import Header from '../../components/Header/Header.jsx'
import BackButton from '../../assets/icons/chevron_left.svg?react'
import {
    setActiveTheme,
    renameTheme,
    deleteTheme,
    setWords,
} from '../../store/themeSlice'
import './Collection.scss'

const Collection = ({ mode, setMode }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const activeThemeId = useSelector((state) => {
        return state.themesStore.activeThemeId
    })
    const activeTheme = useSelector((state) =>
        state.themesStore.themes.find((t) => t.id === activeThemeId)
    )

    const themes = useSelector((state) => state.themesStore.themes)

    useEffect(() => {
        if (!activeThemeId && themes.length > 0) {
            dispatch(setActiveTheme(themes[0].id))
        }
    }, [activeThemeId, themes, dispatch])

    const words = activeTheme?.words || []
    const themeName = activeTheme?.name || 'Без названия'

    const handleDelete = () => {
        dispatch(deleteTheme(activeThemeId))
        navigate('/')
    }

    const handleSave = () => {
        dispatch(renameTheme({ id: activeThemeId, name: themeName }))
        setMode('view')
    }

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
                        onClick={() => navigate(-1)}
                        icon={<BackButton />}
                    />

                    <Controls.Input
                        value={themeName}
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
                        onClick={() => navigate(-1)}
                        icon={<BackButton />}
                    />

                    <div className="header_title_text">
                        {themeName}
                        <div className="header_title_wordsCounter">
                            {words.length} слов
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
                <WordListEditable
                    words={words}
                    setWords={(newWords) => dispatch(setWords(newWords))}
                    mode={mode}
                />
            </div>
        </div>
    )
}

export default Collection
