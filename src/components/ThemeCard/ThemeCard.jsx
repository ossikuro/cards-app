import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../../store/contextTrue'

import Controls from '../Controls'
import './ThemeCard.scss'

const ThemeCard = ({ theme, menuItems = [] }) => {
    const { words, setMode, setActiveTheme } = useContext(AppContext)

    const navigate = useNavigate()

    // Слова, привязанные к этой теме
    const allWords = words.filter((word) => word.tags === theme.id)

    // Слова, готовые к тренировке
    const wordsToTrain = allWords.filter(
        (item) => item.english?.trim() && item.russian?.trim()
    )

    // Имя темы: используем как есть, если задано, иначе показываем "Новая тема"
    const themeName = theme.name?.trim() || 'Новая тема'

    const handleView = () => {
        setActiveTheme(theme)
        setMode('view')
        navigate('/collection')
    }

    return (
        <div className="theme_card_wrapper">
            <div className="theme_name_wrapper">
                <div className="card_name">{themeName}</div>
                <div className="card_number">
                    Тренировать: {wordsToTrain.length} из {allWords.length}
                </div>
            </div>
            <div className="theme_card_buttons">
                <Controls.Button variant="black_txt" onClick={handleView}>
                    Просмотр слов
                </Controls.Button>
                <Controls.Menu items={menuItems} />
            </div>
        </div>
    )
}

export default ThemeCard
