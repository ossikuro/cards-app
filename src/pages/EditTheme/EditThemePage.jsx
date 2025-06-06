import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WordListEditable from '../../components/WordList/WordListEditable.jsx'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme.jsx'
import './EditThemePage.scss'

const EditThemePage = ({ mode, setMode }) => {
    const navigate = useNavigate()
    const [words, setWords] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem('words')
        const parsed = stored ? JSON.parse(stored) : []
        setWords(parsed)
    }, [])

    return (
        <div className="EditThemePage">
            <HeaderTheme
                wordsCount={words.length}
                mode={mode}
                setMode={(newMode) => {
                    if (newMode === 'training') {
                        setMode('training')
                        navigate('/training')
                    } else {
                        setMode(newMode)
                    }
                }}
            />
            <div className="EditThemePage_ContentWrapper">
                <WordListEditable
                    words={words}
                    setWords={setWords}
                    mode={mode}
                />
            </div>
        </div>
    )
}

export default EditThemePage
