import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../../store/contextTrue'

import ThemeList from '../../components/ThemeList/ThemeList.jsx'
import Header from '../../components/Header/Header.jsx'

import logo from '../../assets/logo.png'
import './HomePage.scss'

const HomePage = () => {
    const { loadWords, themes, mode, setMode, loading, error } =
        useContext(AppContext)

    // Загружаем слова с сервера
    useEffect(() => {
        loadWords()
    }, [])
    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <>
            <Header>
                <Link to="/">
                    <img className="logo" src={logo} alt="Логотип" />
                </Link>
            </Header>
            <div className="home_page_wrapper">
                <h1 className="home_page_title">Темы для изучения</h1>
                <ThemeList themes={themes} setMode={setMode} mode={mode} />
            </div>
        </>
    )
}

export default HomePage
