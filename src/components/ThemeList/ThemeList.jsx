import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../../store/contextTrue'

import ThemeCard from '../ThemeCard/ThemeCard'
import AddThemeButton from '../ThemeAddNew/ThemeAddNew'
import './ThemeList.scss'

const ThemeList = ({ themes = [], setMode }) => {
    const navigate = useNavigate()

    const { addTheme, deleteTheme } = useContext(AppContext)

    const handleAddTheme = () => {
        addTheme()
    }

    const handleDeleteTheme = (id) => {
        deleteTheme(id)
    }

    return (
        <div className="theme_list_wrapper">
            {themes.map((showTheme) => (
                <ThemeCard
                    key={showTheme.id}
                    theme={showTheme}
                    menuItems={[
                        {
                            label: 'Редактировать',
                            onClick: () => {
                                setMode('edit')
                                navigate('/collection')
                            },
                        },
                        {
                            label: 'Удалить',
                            onClick: () => handleDeleteTheme(showTheme.id),
                        },
                    ]}
                />
            ))}
            <AddThemeButton onClick={handleAddTheme} />
        </div>
    )
}

export default ThemeList
