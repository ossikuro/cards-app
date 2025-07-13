export const getWords = async () => {
    const response = await fetch('http://itgirlschool.justmakeit.ru/api/words')
    if (!response.ok) throw new Error('Ошибка загрузки слов')
    return await response.json()
}
