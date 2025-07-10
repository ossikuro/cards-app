import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Controls from '../Controls/index.jsx'
import './ThemeCard.scss'
import { setActiveTheme } from '../../store/themeSlice.js'

const ThemeCard = ({ theme, menuItems = [] }) => {
    const allWords = theme.words || []
    const themeName = theme.name || 'Без названия'

    const wordsToTrain = allWords.filter((item) => {
        if (!item) return false
        if (!item.english || item.english.trim() === '') return false
        if (!item.russian || item.russian.trim() === '') return false
        return true
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="theme_card_wrapper">
            <div className="theme_name_wrapper">
                <div className="card_name">{theme.name}</div>
                <div className="card_number">
                    Тренировать: {wordsToTrain.length} из {allWords.length}
                </div>
            </div>
            <div className="theme_card_buttons">
                <Controls.Button
                    variant="black_txt"
                    onClick={() => {
                        dispatch(setActiveTheme(theme.id))
                        navigate('/collection')
                    }}
                >
                    Просмотр слов
                </Controls.Button>
                <Controls.Menu items={menuItems} />
            </div>
        </div>
    )
}

export default ThemeCard
