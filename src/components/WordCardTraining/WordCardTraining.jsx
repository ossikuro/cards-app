import { useState } from 'react'
import Controls from '../Controls'
import './WordCardTraining.scss'

const WordCardTraining = ({ data = {}, onChange }) => {
    const [showTranslation, setShowTranslation] = useState(false)
    return (
        <div className="wordCardTraining_wrapper">
            <div className="wordCardTraining_word_wrapper">
                <div className="wordCardTraining_word">{data.word}</div>
                <div className="wordCardTraining_transcription">
                    {data.transcription}
                </div>
            </div>

            <div className="wordCardTraining_translation_wrapper">
                {showTranslation && (
                    <div className="wordCardTraining_translation">
                        {data.translation}
                    </div>
                )}
            </div>
            <Controls.Button
                variant="transparent_txt"
                onClick={() => setShowTranslation(!showTranslation)}
                type="button"
                aria-label={
                    showTranslation ? 'Скрыть перевод' : 'Показать перевод'
                }
            >
                {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
            </Controls.Button>
        </div>
    )
}

export default WordCardTraining
