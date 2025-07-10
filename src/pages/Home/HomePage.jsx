//хуки
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
//компоненты
import ThemeList from '../../components/ThemeList/ThemeList.jsx'
import Header from '../../components/Header/Header.jsx'
//редьюсеры
import { setScreenState } from '../../store/themeScreenSlice'
//картинки, иконки, стили
import logo from '../../assets/logo.png'
import './HomePage.scss'

const HomePage = () => {
    const dispatch = useDispatch()

    const themes = useSelector((state) => state.themesStore.themes)

    const mode = useSelector((state) => state.screenState.screenState)

    return (
        <>
            <Header>
                <Link to="/">
                    <img className="logo" src={logo} alt="Логотип" />
                </Link>
            </Header>
            <div className="home_page_wrapper">
                <h1 className="home_page_title">Темы для изучения</h1>
                <ThemeList
                    themes={themes}
                    setMode={(mode) => dispatch(setScreenState(mode))}
                />
            </div>
        </>
    )
}

export default HomePage
