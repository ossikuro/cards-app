import WordListEditable from '../../components/WordListEditable/WordListEditable.jsx'
import HeaderTheme from '../../components/HeaderTheme/HeaderTheme.jsx'
import './EditThemePage.scss'

const EditPage = () => {
    return (
        <div className="EditThemePage">
            <HeaderTheme />
            <div className="EditThemePage_ContentWrapper">
                <WordListEditable />
            </div>
        </div>
    )
}

export default EditPage
