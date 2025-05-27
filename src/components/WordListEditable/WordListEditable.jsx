import { useState } from 'react'
import WordCardEditable from '../WordCardEditable/WordCardEditable'
import AddWordButton from '../WordAddNew/WordAddNew'
import './WordListEditable.scss'

// создаем управляемый список
const WordListEditable = () => {
    // создаем переменную слова и функцю обновить слова, в которой..
    const [words, setWords] = useState(() => {
        // берем строчку из localstorage. Localstorage хранит только строчки текста
        const stored = localStorage.getItem('words')
        // если в строчке что-то есть - парсим в массив с ключиками, если нет - создаем пустой массив
        const parsed = stored ? JSON.parse(stored) : []
        //из потенциально кривого файла проверяем наличие всех ключиков, если их нет, то создаем их с 0 значением
        return parsed.map((item) => ({
            // формат: если item есть, возьми что-то или присвой другое значение. ? защита на дурака, т.к. мы не знаем какой массив придет. Вдруг там будет {слово}, <фигня>, {слово}
            id: item?.id || crypto.randomUUID(),
            word: item?.word || '',
            transcription: item?.transcription || '',
            translation: item?.translation || '',
        }))
    })

    //функция обновить localstorage
    const updateStorage = (newWords) => {
        //запихиваем JSON в строку, localstorage жует только строки. Тут есть вопросики
        localStorage.setItem('words', JSON.stringify(newWords))
        //запускаем перерисовку карточек
        setWords(newWords)
    }

    //удалить карточку
    const handleDelete = (idToDelete) => {
        //Создай новый массив, в который попадут все слова, кроме того, у кого id попал как атрибут idToDelete
        const updatedWords = words.filter((word) => word.id !== idToDelete)
        updateStorage(updatedWords)
    }

    //добавить карточку, сгенерировать айдишник
    const handleAddWord = () => {
        const newWord = {
            id: crypto.randomUUID(),
            word: '',
            transcription: '',
            translation: '',
        }
        //добавляем в конец массива
        const updatedWords = [...words, newWord]
        updateStorage(updatedWords)
    }

    //обновляет карточку по id и сохраняет в localstrage
    const handleChange = (id, newData) => {
        //перебираем все слова
        const updatedWords = words.map((word) =>
            // если id из массива совпадает с id карточки, которую дергаем, то перезаписываем слово в массиве на новые данные, в противном случае оставляем все как есть. три точки распаковывают все ключики из одного объекта
            word.id === id ? { ...word, ...newData } : word
        )
        updateStorage(updatedWords)
    }

    //если массив не пустой, то мапим его. Если пустой - создаем 3 карточки пустые
    return (
        <div className="word_list_wrapper">
            {words.length > 0 ? (
                <>
                    {words.map((wordData, idx) => (
                        <WordCardEditable
                            key={wordData.id}
                            index={idx}
                            data={wordData}
                            onChange={(newData) =>
                                handleChange(wordData.id, newData)
                            }
                            //при удалении к айдишнику даем новое значение
                            onDelete={() => handleDelete(wordData.id)}
                        />
                    ))}
                    <AddWordButton onClick={handleAddWord} />
                </>
            ) : (
                <>
                    <WordCardEditable />
                    <WordCardEditable />
                    <WordCardEditable />
                    <AddWordButton onClick={handleAddWord} />
                </>
            )}
        </div>
    )
}

export default WordListEditable
