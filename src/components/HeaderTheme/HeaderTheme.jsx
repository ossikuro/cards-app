import { useState, useEffect, useRef } from 'react'
import Controls from '../Controls'
import './HeaderTheme.scss'
import MenuIcon from '../../assets/icons/menu.svg?react'
import BackIcon from '../../assets/icons/chevron_left.svg?react'

const HeaderListEditable = ({ wordsCount = 0 }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [themeName, setThemeName] = useState('Список слов')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuButtonRef = useRef(null)
    const [menuPosition, setMenuPosition] = useState(null)

    // загружаем из localStorage при старте
    useEffect(() => {
        const stored = localStorage.getItem('themeName')
        if (stored) setThemeName(stored)
    }, [])

    const handleSave = () => {
        localStorage.setItem('themeName', themeName)
        setIsEditing(false)
    }

    return (
        <div className="header_wrapper">
            <Controls.Button
                variant="transparent_icon"
                type="button"
                aria-label="Назад"
            >
                <BackIcon />
            </Controls.Button>

            {isEditing ? (
                <Controls.Input
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                />
            ) : (
                <div className="header_title_text">
                    {themeName}
                    <div className="header_title_wordsCounter">
                        {wordsCount} слов
                    </div>
                </div>
            )}

            <div className="header_buttons_wrapper">
                {isEditing ? (
                    <Controls.Button variant="black_txt" onClick={handleSave}>
                        Сохранить
                    </Controls.Button>
                ) : (
                    <Controls.Button
                        variant="black_txt"
                        onClick={() => console.log('Тренировать')}
                    >
                        Тренировать
                    </Controls.Button>
                )}

                <Controls.Button
                    variant="transparent_icon"
                    ref={menuButtonRef}
                    onClick={() => {
                        const rect =
                            menuButtonRef.current.getBoundingClientRect()
                        setMenuPosition({ top: rect.bottom, left: rect.left })
                        setIsMenuOpen(true)
                    }}
                    active={isMenuOpen}
                >
                    <MenuIcon />
                </Controls.Button>
            </div>
            {isMenuOpen && (
                <Controls.Menu
                    position={menuPosition}
                    items={[
                        {
                            label: 'Редактировать',
                            onClick: () => setIsEditing(true),
                        },
                        {
                            label: 'Удалить',
                            onClick: () => console.log('Удалить тему'),
                        },
                    ]}
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    )
}

export default HeaderListEditable
