import { useRef, useEffect, useState } from 'react'

/** Используй const [ref] = useAutoFocus(true) для автофокуса и const [ref, setFocus] = useAutoFocus() для авто-фокуса */
const useAutoFocus = (auto = false) => {
    const ref = useRef(null)
    const [isAutoFocused, setIsAutoFocused] = useState(false)

    /**Установить фокус вручную на элементе */
    const setFocus = () => {
        if (ref.current) {
            ref.current.focus()
        }
    }

    // Автоматически поставить фокус при монтировании, если включён auto
    useEffect(() => {
        if (auto && ref.current) {
            console.log('🔍 autoFocus сработал на элемент:', ref.current)
            ref.current.focus()
            setIsAutoFocused(true)
        }
    }, [auto])

    return [ref, setFocus, isAutoFocused]
}

export default useAutoFocus
