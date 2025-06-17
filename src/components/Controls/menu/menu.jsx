import { useState, useRef } from 'react'
import Controls from '..'
import './menu.scss'
import MenuIcon from '../../../assets/icons/menu.svg?react'

const Menu = ({ items = [] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, right: 0 })
    const menuButtonRef = useRef(null)

    const openMenu = () => {
        const getTriggerPosition = menuButtonRef.current.getBoundingClientRect()
        const top = getTriggerPosition.bottom
        const right = window.innerWidth - getTriggerPosition.right

        setPosition({ top, right })
        setIsOpen(true)
    }

    const closeMenu = () => setIsOpen(false)

    return (
        <div className="menu_wrapper">
            <Controls.Button
                variant="transparent_icon"
                ref={menuButtonRef}
                onClick={openMenu}
                active={isOpen}
                icon={<MenuIcon />}
            />

            {isOpen && (
                <div className="menu_overlay_wrapper" onClick={closeMenu}>
                    <div
                        className="menu_content_wrapper"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            top: `${position.top + 8}px`,
                            right: `${position.right - 8}px`,
                        }}
                    >
                        {items.map((item, idx) => (
                            <button
                                key={idx}
                                className="menu_item"
                                onClick={() => {
                                    item.onClick()
                                    closeMenu()
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu
