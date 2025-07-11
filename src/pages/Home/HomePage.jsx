import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { WordsContext } from '../../store/wordsContext.jsx'

import ThemeList from '../../components/ThemeList/ThemeList.jsx'
import Header from '../../components/Header/Header.jsx'

import logo from '../../assets/logo.png'
import './HomePage.scss'

const HomePage = () => {
    const { tags, mode, setMode } = useContext(WordsContext)

    return (
        <>
            <Header>
                <Link to="/">
                    <img className="logo" src={logo} alt="Логотип" />
                </Link>
            </Header>
            <div className="home_page_wrapper">
                <h1 className="home_page_title">Темы для изучения</h1>
                <ThemeList themes={tags} setMode={setMode} mode={mode} />
            </div>
        </>
    )
}

export default HomePage
