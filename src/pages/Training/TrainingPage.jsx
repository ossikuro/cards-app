//хуки
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//компоненты
import Controls from '../../components/Controls/index.jsx'
import Header from '../../components/Header/Header.jsx'
import WordListTraining from '../../components/WordListTraining/WordListTraining'
//редьюсеры
import { setScreenState } from '../../store/themeScreenSlice'
//картинки, иконки, стили
import BackButton from '../../assets/icons/chevron_left.svg?react'
import emptyImage from '../../assets/emptyImage.png'
import './TrainingPage.scss'

const TrainingPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const activeThemeId = useSelector(
        (state) => state.themesStore.activeThemeId
    )
    const activeTheme = useSelector((state) =>
        state.themesStore.themes.find((t) => t.id === activeThemeId)
    )

    const allWords = activeTheme?.words || []
    const themeName = activeTheme?.name || 'Без названия'

    const [learnedCount, setLearnedCount] = useState(0)

    const words = allWords.filter((item) => {
        if (!item) return false
        if (!item.word || item.word.trim() === '') return false
        if (!item.translation || item.translation.trim() === '') return false
        return true
    })

    return (
        <>
            <Header
                menuItems={[
                    {
                        label: 'Редактировать',
                        onClick: () => {
                            dispatch(setScreenState('edit'))
                            navigate('/collection')
                        },
                    },
                    {
                        label: 'Удалить',
                        onClick: () => {
                            dispatch(setScreenState('view'))
                            navigate('/collection')
                        },
                    },
                ]}
            >
                <Controls.Button
                    variant="transparent_icon"
                    aria-label="Назад"
                    onClick={() => window.history.back()}
                    icon={<BackButton />}
                />
                <div className="header_title_text">
                    {themeName}
                    <div className="header_title_wordsCounter">
                        {`Выучено ${learnedCount} слов из ${words.length}`}
                    </div>
                </div>
                <Controls.Button
                    variant="black_txt"
                    onClick={() => {
                        dispatch(setScreenState('view'))
                        navigate('/collection')
                    }}
                >
                    Просмотр слов
                </Controls.Button>
            </Header>

            {words.length > 0 ? (
                <WordListTraining
                    words={words}
                    setLearnedCount={setLearnedCount}
                />
            ) : (
                <div className="training_empty">
                    <img
                        src={emptyImage}
                        alt="Поздравляем, ты всё выучил!"
                        className="training_empty_image"
                    />
                    <p className="training_empty_text">
                        Здесь просто нет слов 🥱
                    </p>
                </div>
            )}
        </>
    )
}

export default TrainingPage
