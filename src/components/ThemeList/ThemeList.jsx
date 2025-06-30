import ThemeCard from '../ThemeCard/ThemeCard'
//import './ThemeList.scss'

const ThemeList = ({ themes = [] }) => {
    return (
        <div className="theme_list_wrapper">
            {themes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
            ))}
        </div>
    )
}

export default ThemeList
