import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme'
import WordListTraining from '../../components/WordListTraining/WordListTraining'

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
                <p className="training_empty">Нет слов для тренировки</p>
            )}
        </>
    )
}

export default TrainingPage
