import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage.jsx'
import TrainingPage from './pages/Training/TrainingPage.jsx'
import Collection from './pages/Collection/Collection.jsx'
import './App.css'
import './style/reset.css'
import './style/normalize.css'

const App = () => {
    const [mode, setMode] = useState(() => {
        if (window.location.pathname === '/training') return 'training'
        return 'view'
    })

    return (
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
        </Routes>
    )
}

export default App
