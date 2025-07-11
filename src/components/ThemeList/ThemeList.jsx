import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { WordsContext } from '../../store/wordsContext.jsx'
import ThemeCard from '../ThemeCard/ThemeCard'
import AddThemeButton from '../ThemeAddNew/ThemeAddNew'
import './ThemeList.scss'

const ThemeList = ({ themes = [], setMode }) => {
    const { tags, setTags, activeTag, setActiveTag } = useContext(WordsContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!activeTag && tags.length > 0) {
            setActiveTag(tags[0].id)
        }
    }, [activeTag, tags, setActiveTag])

    const handleAddTheme = () => {
        const baseName = 'Новая тема'
        const names = tags.map((t) => t.name)
        const sameNames = names.filter((n) => n.startsWith(baseName))

        const newTheme = {
            id: Date.now().toString(),
            name: sameNames.length
                ? `${baseName} ${sameNames.length + 1}`
                : baseName,
            words: [],
        }

        setTags([...tags, newTheme])
    }

    const handleDeleteTheme = (id) => {
        const confirmed = confirm('Удалить тему?')
        if (confirmed) {
            setTags(tags.filter((t) => t.id !== id))
        }
    }

    return (
        <div className="theme_list_wrapper">
            {tags.map((theme) => (
                <ThemeCard
                    key={theme.id}
                    theme={theme}
                    menuItems={[
                        {
                            label: 'Редактировать',
                            onClick: () => {
                                setActiveTag(theme.id)
                                setMode('edit')
                                navigate('/collection')
                            },
                        },
                        {
                            label: 'Удалить',
                            onClick: () => handleDeleteTheme(theme.id),
                        },
                    ]}
                />
            ))}
            <AddThemeButton onClick={handleAddTheme} />
        </div>
    )
}

export default ThemeList
