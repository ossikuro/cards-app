import { useEffect, useState } from 'react'
import Controls from '../../style'
import './WordCardEditable.scss'
import DeleteIcon from '../../assets/icons/delete.svg?react'

const WordCardEditable = ({ index, onDelete, initialData = {} }) => {
    const [word, setWord] = useState(initialData.word || '')
    const [transcription, setTranscription] = useState(
        initialData.transcription || ''
    )
    const [translation, setTranslation] = useState(
        initialData.translation || ''
    )

    // Сохраняем изменения в localStorage при каждом обновлении
    useEffect(() => {
        const current = JSON.parse(localStorage.getItem('words') || '[]')
        current[index] = { word, transcription, translation }
        localStorage.setItem('words', JSON.stringify(current))
    }, [word, transcription, translation, index])

    return (
        <div className="editable_card_wrapper">
            <div className="editable_card_text">{index + 1}</div>

            <div className="editable_card_fields_wrapper">
                <Controls.Input
                    label="Английское слово"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <Controls.Input
                    label="Транскрипция"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                />
                <Controls.Input
                    label="Перевод"
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                />
            </div>

            <div className="editable_card_fields_delete_wrapper">
                <button
                    className="transparent_icon_btn"
                    onClick={() => onDelete(index)}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

export default WordCardEditable
