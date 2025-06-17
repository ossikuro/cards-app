import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Controls from '../../components/Controls/index.jsx'
import Header from '../../components/Header/Header.jsx'
import WordListTraining from '../../components/WordListTraining/WordListTraining'
import './TrainingPage.scss'
import BackButton from '../../assets/icons/chevron_left.svg?react'
import emptyImage from '../../assets/emptyImage.png'

const TrainingPage = ({ mode, setMode }) => {
    const navigate = useNavigate()
    const [words, setWords] = useState([])
    const [themeName, setThemeName] = useState('Список слов')

    useEffect(() => {
        const stored = localStorage.getItem('words')
        if (!stored) return

        const parsed = JSON.parse(stored)
        const filtered = parsed.filter(
            (item) => item?.word?.trim() && item?.translation?.trim()
        )
        setWords(filtered)
    }, [])

    useEffect(() => {
        setMode('training')
    }, [setMode])

    return (
        <>
            <Header
                menuItems={[
                    {
                        label: 'Редактировать',
                        onClick: () => {
                            setMode('edit')
                            navigate('/collection')
                        },
                    },
                    {
                        label: 'Удалить',
                        onClick: () => {
                            setMode('view')
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
                        {words.length} слов
                    </div>
                </div>
                <Controls.Button
                    variant="black_txt"
                    onClick={() => {
                        setMode('view')
                        navigate('/collection')
                    }}
                >
                    Просмотр слов
                </Controls.Button>
            </Header>

            {words.length > 0 ? (
                <WordListTraining words={words} />
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
