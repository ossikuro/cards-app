import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ContextProvider } from './store/contextTrue.jsx'
import { WordsProvider } from './store/wordsContext.jsx'

import HomePage from './pages/Home/HomePage.jsx'
import TrainingPage from './pages/Training/TrainingPage.jsx'
import Collection from './pages/Collection/Collection.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

import './App.css'
import './style/reset.css'
import './style/normalize.css'
import { WordsContext } from './store/wordsContext.jsx'

const App = () => {
    const [mode, setMode] = useState(() => {
        if (window.location.pathname === '/training') return 'training'
        return 'view'
    })

    return (
        <WordsProvider>
            <ContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/collection"
                        element={<Collection mode={mode} setMode={setMode} />}
                    />
                    <Route
                        path="/training"
                        element={<TrainingPage mode={mode} setMode={setMode} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ContextProvider>
        </WordsProvider>
    )
}

export default App
