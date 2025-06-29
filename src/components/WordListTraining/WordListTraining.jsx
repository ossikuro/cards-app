import { useState, useEffect } from 'react'
import Controls from '../Controls'
import WordCardTraining from '../WordCardTraining/WordCardTraining'
import victoryImage from '../../assets/victoryImage.png'
import './WordListTraining.scss'

const WordListTraining = ({ words = [], setLearnedCount }) => {
    const [index, setIndex] = useState(0)

    const next = () => {
        if (index < words.length) {
            setIndex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    const [revealedWordIds, setRevealedWordIds] = useState([])

    const handleReveal = (id) => {
        if (!revealedWordIds.includes(id)) {
            setRevealedWordIds((revealWords) => [...revealWords, id])
            setLearnedCount((revealWordsNum) => revealWordsNum + 1)
        }
    }

    useEffect(() => {
        console.log('Счётчик обновился:', setLearnedCount)
    }, [setLearnedCount])

    const isFinished = index >= words.length
    const visibleCards = words.slice(index, index + 3)

    return (
        <div className="training_content">
            <div className="stack_wrapper">
                {!isFinished ? (
                    visibleCards.map((word, i) => (
                        <div
                            key={word.id}
                            className={`card_layer card_layer--${i}`}
                            style={{ zIndex: 3 - i }}
                        >
                            <WordCardTraining
                                data={word}
                                onReveal={() => handleReveal(word.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="training_result">
                        <img
                            src={victoryImage}
                            alt="Поздравляем, ты всё выучил!"
                            className="training_result_image"
                        />
                        <p className="training_result_text">
                            Ура! Ты всё выучил 🎉
                        </p>
                    </div>
                )}
            </div>

            <div className="stack_footer">
                <Controls.Button
                    style={{ width: '10rem' }}
                    variant="white_txt"
                    onClick={prev}
                    disabled={index === 0}
                >
                    Назад
                </Controls.Button>
                <Controls.Button
                    style={{ width: '10rem' }}
                    variant="white_txt"
                    onClick={next}
                    disabled={isFinished}
                >
                    Вперёд
                </Controls.Button>
            </div>
        </div>
    )
}

export default WordListTraining
