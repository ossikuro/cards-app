import { useState, useEffect } from 'react'
import './App.css'
import './style/reset.css'
import './style/normalize.css'
import Controls from './style'
import WordCardEditable from './components/WordCardEditable/WordCardEditable.jsx'

function App() {
    const [words, setWords] = useState([])

    useEffect(() => {
        // Устанавливаем тестовые данные, если они не были сохранены
        const initialData = [
            { word: 'Hello', transcription: '[həˈloʊ]', translation: 'Привет' },
            { word: 'World', transcription: '[wɜːrld]', translation: 'Мир' },
        ]
        localStorage.setItem('words', JSON.stringify(initialData)) // Сохраняем тестовые данные

        const savedWords = JSON.parse(localStorage.getItem('words') || '[]')
        console.log(savedWords) // Логируем, чтобы увидеть данные
        setWords(savedWords)
    }, [])

    // Удаление карточки по индексу
    const handleDelete = (indexToDelete) => {
        const updatedWords = words.filter((_, i) => i !== indexToDelete)
        setWords(updatedWords)
        localStorage.setItem('words', JSON.stringify(updatedWords))
    }

    return (
        <>
            <Controls.Button variant="black_txt">
                Тестовая кнопка
            </Controls.Button>
            <Controls.Input
                label="test"
                placeholder="проверка"
                error={true}
            ></Controls.Input>

            {/* Карточки для редактирования */}
            {words.map((wordData, idx) => (
                <WordCardEditable
                    key={idx}
                    index={idx}
                    onDelete={handleDelete}
                    initialData={wordData}
                />
            ))}

            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src="/react.svg"
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setWords([])}>Reset Words</button>
            </div>
        </>
    )
}

export default App
