import { useState } from 'react'
import Controls from '../Controls'
import './WordCardEditable.scss'
import DeleteIcon from '../../assets/icons/delete.svg?react'

// передаем пропс в функцию: массив с ключами из родителя, 2 функции и индекс
const WordCardEditable = ({ data = {}, onChange, onDelete, index = 0 }) => {
    const [word, setWord] = useState(data.english || '')

    // объявляем переменную error с функцией которая включает или выключает состояние ошибки.
    const [error, setError] = useState(false)

    // валидация поля английское слово. Она принимает значение в поле и статус ошибки.
    const handleChange = (field, value) => {
        // если мы смотрим на поле слово
        if (field === 'english') {
            const onlyEnglish = /^[\x00-\x7F]*$/
            if (onlyEnglish.test(value)) {
                setError(false)
                setWord(value)
                onChange({ ...data, english: value })
            } else {
                setError(true)
                return
            }
        } else {
            onChange({ ...data, [field]: value })
        }
    }

    return (
        <div className="editable_card_wrapper">
            <div className="editable_card_text">{index + 1}</div>

            <div className="editable_card_fields_wrapper">
                <Controls.Input
                    label="Английское слово"
                    value={word}
                    error={error}
                    onChange={(e) => handleChange('english', e.target.value)}
                />
                <Controls.Input
                    label="Транскрипция"
                    value={data.transcription || ''}
                    onChange={(e) =>
                        handleChange('transcription', e.target.value)
                    }
                />
                <div className="editable_card_text">–</div>

                <Controls.Input
                    label="Перевод"
                    value={data.russian || ''}
                    onChange={(e) => handleChange('russian', e.target.value)}
                />
            </div>

            <div className="editable_card_fields_delete_wrapper">
                <Controls.Button
                    variant="transparent_icon"
                    onClick={onDelete}
                    type="button"
                    aria-label="Удалить карточку"
                >
                    <DeleteIcon />
                </Controls.Button>
            </div>
        </div>
    )
}

export default WordCardEditable
