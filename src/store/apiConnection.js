// api.js

// Получить все слова
export const getWords = async () => {
    const response = await fetch('http://itgirlschool.justmakeit.ru/api/words')
    if (!response.ok) throw new Error('Ошибка загрузки слов')
    return await response.json()
}

/// apiConnection.js

export const sendWord = async (word, action) => {
    const base = 'http://itgirlschool.justmakeit.ru/api/words'
    const url =
        action === 'add'
            ? `${base}/add`
            : action === 'update'
            ? `${base}/${word.id}/update`
            : action === 'delete'
            ? `${base}/${word.id}/delete`
            : (() => {
                  throw new Error(action)
              })()

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word),
    })
}

// добавляем сразу экспорт sendWords
export const sendWords = (words, serverActions) =>
    Promise.all(
        Object.entries(serverActions).map(([id, action]) =>
            sendWord(words.find((w) => w.id === id) || { id }, action)
        )
    )
