import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme'
import WordListTraining from '../../components/WordListTraining/WordListTraining.jsx'

const TrainingPage = () => {
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
                mode="training"
                setMode={(newMode) => {
                    if (newMode === 'edit') {
                        navigate('/collection')
                    }
                }}
            />
            {words.length === 0 ? (
                <p className="training_empty">Нет слов для тренировки</p>
            ) : (
                <WordListTraining words={words} />
            )}
        </>
    )
}

export default TrainingPage
