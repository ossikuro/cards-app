import { useState } from 'react'
import Controls from '../Controls'
import './WordCardEditable.scss'
import DeleteIcon from '../../assets/icons/delete.svg?react'

// передаем пропс в функцию: массив с ключами из родителя, 2 функции и индекс
const WordCardEditable = ({ data = {}, onChange, onDelete, index }) => {
    // объявляем переменную word с функцией setWords, которая с помощью хука присваивает или значение из родителя или ''. Переменная нам нужна, потому что перед отправкой в родителя нам надо ее валидировать. И если валидацию пройдет - перезаписать значение в родительском массиве.
    const [word, setWord] = useState(data.word || '')

    // объявляем переменную error с функцией которая включает или выключает состояние ошибки.
    const [error, setError] = useState(false)

    // валидация поля английское слово. Она принимает значение в поле и статус ошибки.
    const handleChange = (field, value) => {
        // если мы смотрим на поле слово
        if (field === 'word') {
            //регулярка проверки
            const onlyEnglish = /^[\x00-\x7F]*$/
            // если значение удовлетворяет регулярке, то делаем...
            if (onlyEnglish.test(value)) {
                setError(false) // убираем ошибку
                setWord(value) // обновляем слово локально
                onChange({ ...data, word: value }) // запускаем обновление массива в родителе
            } else {
                setError(true) // ставим ошибку
                return // не передаём родителю
            }
        } else {
            //создаёт копию объекта data с одним обновлённым полем (по имени field), и передаёт его родителю через onChange. field в [], потому что field - это переменная.
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
                    //Когда пользователь введёт что-то в инпут, вызови функцию handleChange, и передай туда: поле 'word' и клик.поинпуту.значение
                    onChange={(e) => handleChange('word', e.target.value)}
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
                    value={data.translation || ''}
                    onChange={(e) =>
                        handleChange('translation', e.target.value)
                    }
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
