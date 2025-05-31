import './menu.scss'

const Menu = ({ items = [], onClose, position = {} }) => {
    const { top = 0, right = 0 } = position

    return (
        <div className="menu_overlay_wrapper" onClick={onClose}>
            <div
                className="menu_content_wrapper"
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'absolute',
                    top: `${top + 8}px`,
                    right: `${right + 8}px`,
                }}
            >
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        className="menu_item"
                        onClick={() => {
                            item.onClick()
                            onClose()
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Menu
