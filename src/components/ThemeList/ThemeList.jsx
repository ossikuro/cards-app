import ThemeCard from '../ThemeCard/ThemeCard'
import {
    addTheme,
    deleteTheme,
    setActiveTheme,
    deleteThemeAsync,
} from '../../store/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AddThemeButton from '../ThemeAddNew/ThemeAddNew'
import './ThemeList.scss'

const ThemeList = ({ themes = [], setMode }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeThemeId = useSelector(
        (state) => state.themesStore.activeThemeId
    )

    useEffect(() => {
        if (!activeThemeId && themes.length > 0) {
            dispatch(setActiveTheme(themes[0].id))
        }
    }, [activeThemeId, themes, dispatch])

    const handleAddTheme = () => {
        const baseName = 'Новая тема'

        // получаем все названия тем
        const names = themes.map((t) => t.name)

        // фильтруем те, что начинаются с 'Новая тема'
        const sameNames = names.filter(
            (name) => name === baseName || name.startsWith(`${baseName} (`)
        )

        // вычисляем следующий номер
        const count = sameNames.length + 1
        const finalName = count === 1 ? baseName : `${baseName} (${count})`

        dispatch(addTheme(finalName))
        console.log('Добавлена тема:', finalName)
    }

    return (
        <div className="theme_list_wrapper">
            {themes.map((theme) => (
                <ThemeCard
                    key={theme.id}
                    theme={theme}
                    menuItems={[
                        {
                            label: 'Редактировать',
                            onClick: () => {
                                dispatch(setActiveTheme(theme.id))
                                setMode('edit')
                                navigate('/collection')
                            },
                        },
                        {
                            label: 'Удалить тему',
                            onClick: () => {
                                dispatch(deleteThemeAsync(theme.id))
                                navigate('/')
                            },
                        },
                    ]}
                />
            ))}
            <AddThemeButton onClick={handleAddTheme} />
        </div>
    )
}

export default ThemeList
