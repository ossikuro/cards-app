import { useState } from 'react'
import Controls from '../Controls'
import './WordCardTraining.scss'
import useAutoFocus from '../Hooks/autoFocus'

const WordCardTraining = ({ data = {}, onReveal }) => {
    const [showTranslation, setShowTranslation] = useState(false)
    const [hasRevealed, setHasRevealed] = useState(false)
    const handleClick = () => {
        if (!hasRevealed) {
            onReveal?.() // вызываем родителя один раз
            setHasRevealed(true) // запоминаем, что уже показывали
        }
        setShowTranslation((prev) => !prev) // переключаем перевод
    }

    const [autoRef, , isAutoFocused] = useAutoFocus(true)
    console.log('🧪 isAutoFocused:', isAutoFocused)

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
                onClick={() => handleClick()}
                ref={autoRef}
                className={isAutoFocused ? 'force-visible' : ''}
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
