import Controls from '../Controls'
import './Header.scss'

const Header = ({ children, menuItems = [] }) => {
    return (
        <div className="header_wrapper">
            {children}
            <Controls.Menu items={menuItems} />
        </div>
    )
}

export default Header
