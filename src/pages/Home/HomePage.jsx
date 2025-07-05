import { useState } from 'react'
import { useSelector } from 'react-redux'
import ThemeList from '../../components/ThemeList/ThemeList.jsx'
import Header from '../../components/Header/Header.jsx'
import './HomePage.scss'
import logo from '../../assets/logo.png'

const HomePage = () => {
    const themes = useSelector((state) => state.themesStore.themes)

    const [mode, setMode] = useState('view') // 👈 добавили

    return (
        <>
            <Header>
                <a>
                    <img className="logo" src={logo} alt="Логотип" />
                </a>
            </Header>
            <div className="home_page_wrapper">
                <h1 className="home_page_title">Темы для изучения</h1>
                <ThemeList themes={themes} setMode={setMode} />{' '}
                {/* 👈 пробрасываем */}
            </div>
        </>
    )
}

export default HomePage
