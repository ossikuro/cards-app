import './WordCard.scss'

const WordCard = ({ data = {}, index }) => {
    const noTranslation = !data.translation?.trim()

    return (
        <div
            className={`card_wrapper${noTranslation ? ' no-translation' : ''}`}
        >
            <div className="card_text">
                {' '}
                {typeof index === 'number' ? index + 1 : ''}
            </div>

            <div className="card_fields_wrapper">
                <div className="card_column">
                    Слово
                    <div className="card_word ">{data.word}</div>
                </div>
                <div className="card_column">
                    {data.transcription?.trim() === '' ? '' : 'Транскрипция'}
                    <div className="card_word ">{data.transcription}</div>
                </div>
                <div className="card_column">
                    Перевод
                    <div className="card_word ">{data.translation}</div>
                </div>
            </div>
        </div>
    )
}

export default WordCard
