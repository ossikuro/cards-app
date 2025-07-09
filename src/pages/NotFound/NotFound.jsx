import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import errorImage from '../../assets/404Image.png'
import logo from '../../assets/logo.png'
import './NotFound.scss'

const ErrorPage = () => {
    return (
        <>
            <Header>
                <Link to="/">
                    <img className="logo" src={logo} alt="Логотип" />
                </Link>
            </Header>
            <div className="page_empty">
                <img
                    src={errorImage}
                    alt="Нет слов"
                    className="page_empty_image"
                />
                <p className="page_empty_text">Все пропало, страница тоже</p>
            </div>
        </>
    )
}

export default ErrorPage
