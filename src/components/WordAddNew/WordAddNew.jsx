import './WordAddNew.scss'

const AddWordButton = ({ onClick }) => {
    return (
        <button className="white_txt_add_btn" onClick={onClick}>
            Добавить слово
        </button>
    )
}

export default AddWordButton
