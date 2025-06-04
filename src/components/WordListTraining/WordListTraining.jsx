import { useState } from 'react'
import Controls from '../Controls'
import WordCardTraining from '../WordCardTraining/WordCardTraining'
import './WordListTraining.scss'

const WordListTraining = ({ words = [] }) => {
    const [index, setindex] = useState(0)

    const next = () => {
        if (index < words.length - 1) {
            setindex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            setindex(index - 1)
        }
    }

    const visibleCards = words.slice(index, index + 3)

    return (
        <div className="training_content">
            <div className="stack_wrapper">
                {visibleCards.map((word, i) => (
                    <div
                        key={word.id}
                        className={`card_layer card_layer--${i}`}
                        style={{ zIndex: 3 - i }}
                    >
                        <WordCardTraining data={word} />
                    </div>
                ))}
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
                    disabled={index >= words.length - 1}
                >
                    Вперёд
                </Controls.Button>
            </div>
        </div>
    )
}

export default WordListTraining
