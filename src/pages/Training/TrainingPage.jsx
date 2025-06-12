import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme'
import WordListTraining from '../../components/WordListTraining/WordListTraining'
import './TrainingPage.scss'
import emptyImage from '../../assets/emptyImage.png'

const TrainingPage = ({ mode, setMode }) => {
    const navigate = useNavigate()
    const [words, setWords] = useState([])

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
            <HeaderTheme
                wordsCount={words.length}
                mode={mode}
                setMode={(newMode) => {
                    setMode(newMode)
                    navigate('/collection')
                }}
            />

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
