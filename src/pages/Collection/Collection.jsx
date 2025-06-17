import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WordListEditable from '../../components/WordList/WordListEditable.jsx'
import Controls from '../../components/Controls/index.jsx'
import Header from '../../components/Header/Header.jsx'
import BackButton from '../../assets/icons/chevron_left.svg?react'
import './Collection.scss'

const Collection = ({ mode, setMode }) => {
    const navigate = useNavigate()
    const [words, setWords] = useState([])
    const [themeName, setThemeName] = useState('Список слов')

    useEffect(() => {
        const stored = localStorage.getItem('words')
        const parsed = stored ? JSON.parse(stored) : []
        setWords(parsed)
    }, [])

    const handleSave = () => {
        localStorage.setItem('themeName', themeName)
        setMode('view')
    }

    return (
        <div className="Collection">
            {mode === 'edit' ? (
                <Header
                    menuItems={[
                        {
                            label: 'Просмотр слов',
                            onClick: () => {
                                setMode('view')
                                navigate('/collection')
                            },
                        },
                        {
                            label: 'Удалить тему',
                            onClick: () => console.log('Удалить тему'),
                        },
                    ]}
                >
                    <Controls.Button
                        variant="transparent_icon"
                        aria-label="Назад"
                        onClick={() => window.history.back()}
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
                            onClick: () => console.log('Удалить тему'),
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
                    setWords={setWords}
                    mode={mode}
                />
            </div>
        </div>
    )
}

export default Collection
