import { useEffect, useState } from 'react'
import Controls from '../Controls'
import './WordCardEditable.scss'
import DeleteIcon from '../../assets/icons/delete.svg?react'

// data берем ключи, которые нам отдали снаружи или пустой объект, 2 функции из родителя, индекс из родителя
const WordCardEditable = ({ data = {}, onChange, onDelete, index }) => {
    // для переменной word меняй значение по команде setWord. Для изменения используем хук и берем значение из data или пустую строчку
    const [word, setWord] = useState(data.word || '')
    const [transcription, setTranscription] = useState(data.transcription || '')
    const [translation, setTranslation] = useState(data.translation || '')

    // Обновляем значения ключей, если массив слов в родителе изменился
    useEffect(() => {
        setWord(data.word || '')
        setTranscription(data.transcription || '')
        setTranslation(data.translation || '')
    }, [data.word, data.transcription, data.translation])

    // Обновляем родителя прямо при изменении
    const handleChange = (field, value) => {
        const updated = {
            word,
            transcription,
            translation,
            [field]: value,
        }

        // Локально обновляем
        if (field === 'word') setWord(value)
        if (field === 'transcription') setTranscription(value)
        if (field === 'translation') setTranslation(value)

        // Отправляем наружу
        onChange(updated)
    }

    return (
        <div className="editable_card_wrapper">
            <div className="editable_card_text">{index + 1}</div>

            <div className="editable_card_fields_wrapper">
                <Controls.Input
                    label="Английское слово"
                    value={word}
                    onChange={(e) => handleChange('word', e.target.value)}
                />
                <Controls.Input
                    label="Транскрипция"
                    value={transcription}
                    onChange={(e) =>
                        handleChange('transcription', e.target.value)
                    }
                />
                <div className="editable_card_text">–</div>
                <Controls.Input
                    label="Перевод"
                    value={translation}
                    onChange={(e) =>
                        handleChange('translation', e.target.value)
                    }
                />
            </div>

            <div className="editable_card_fields_delete_wrapper">
                <button className="transparent_icon_btn" onClick={onDelete}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}

export default WordCardEditable
