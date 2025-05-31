import './WordCard.scss'

const WordCard = ({ data = {}, index }) => {
    const noTranslation = !data.translation?.trim()

    return (
        <div
            className={`card_wrapper${noTranslation ? ' no-translation' : ''}`}
        >
            <div className="card_text">{index + 1}</div>

            <div className="card_fields_wrapper">
                <div>
                    Слово
                    <div>{data.word}</div>
                </div>
                <div>
                    Транскрипция
                    <div>{data.transcription}</div>
                </div>
                <div>
                    Перевод
                    <div>{data.translation}</div>
                </div>
            </div>
        </div>
    )
}

export default WordCard
