import { useEffect, useState } from 'react'
import WordListEditable from '../../components/WordList/WordListEditable.jsx'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme.jsx'
import './EditThemePage.scss'

const EditPage = () => {
    const [isEditing, setIsEditing] = useState(false)
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
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
            <div className="EditThemePage_ContentWrapper">
                <WordListEditable
                    words={words}
                    setWords={setWords}
                    isEditing={isEditing}
                />
            </div>
        </div>
    )
}

export default EditPage
