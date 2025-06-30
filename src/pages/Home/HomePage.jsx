import { useSelector, useDispatch } from 'react-redux'

import { addTheme } from '../../store/themeSlice'
import Controls from '../../components/Controls'
import ThemeList from '../../components/ThemeList/ThemeList.jsx'

const HomePage = () => {
    const themes = useSelector((state) => state.themesStore.themes)
    const dispatch = useDispatch()

    const handleAddTheme = () => {
        dispatch(addTheme('Новая тема'))
    }

    return (
        <div className="home_page_wrapper">
            <h1 className="home_page_title">Темы для изучения</h1>

            <Controls.Button variant="black_txt" onClick={handleAddTheme}>
                Добавить тему
            </Controls.Button>

            <ThemeList themes={themes} />
        </div>
    )
}

export default HomePage
