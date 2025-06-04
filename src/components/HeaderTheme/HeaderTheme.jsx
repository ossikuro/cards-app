import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Controls from '../Controls'
import './HeaderTheme.scss'
import MenuIcon from '../../assets/icons/menu.svg?react'
import BackIcon from '../../assets/icons/chevron_left.svg?react'

const HeaderListEditable = ({ wordsCount = 0, mode = 'view', setMode }) => {
    const [themeName, setThemeName] = useState('Список слов')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuButtonRef = useRef(null)
    const [menuPosition, setMenuPosition] = useState(null)
    const navigate = useNavigate()

    // загружаем из localStorage при старте
    useEffect(() => {
        const stored = localStorage.getItem('themeName')
        if (stored) setThemeName(stored)
    }, [])

    const handleSave = () => {
        localStorage.setItem('themeName', themeName)
        setMode('view')
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

            {mode === 'edit' ? (
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
                {mode === 'edit' && (
                    <Controls.Button variant="black_txt" onClick={handleSave}>
                        Сохранить
                    </Controls.Button>
                )}

                {mode === 'view' && (
                    <Controls.Button
                        variant="black_txt"
                        onClick={() => {
                            setMode('training')
                            navigate('/training')
                        }}
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
                    items={
                        mode === 'edit'
                            ? [
                                  {
                                      label: 'Просмотр слов',
                                      onClick: () => {
                                          setMode('view')
                                          navigate('/collection')
                                      },
                                  },
                                  {
                                      label: 'Удалить тему',
                                      onClick: () =>
                                          console.log('Удалить тему'),
                                  },
                              ]
                            : mode === 'training'
                            ? [
                                  {
                                      label: 'Редактировать',
                                      onClick: () => setMode('edit'),
                                  },
                                  {
                                      label: 'Просмотр слов',
                                      onClick: () => setMode('view'),
                                  },
                              ]
                            : [
                                  {
                                      label: 'Редактировать',
                                      onClick: () => {
                                          setMode('edit')
                                          navigate('/collection')
                                      },
                                  },
                                  {
                                      label: 'Удалить тему',
                                      onClick: () =>
                                          console.log('Удалить тему'),
                                  },
                              ]
                    }
                    onClose={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    )
}

export default HeaderListEditable
