import './ThemeAddNew.scss'

const AddThemeButton = ({ onClick }) => {
    return (
        <button className="white_txt_add_btn" onClick={onClick}>
            Добавить тему
        </button>
    )
}

export default AddThemeButton
