import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import EditThemePage from './pages/EditTheme/EditThemePage.jsx'
import TrainingPage from './pages/Training/TrainingPage.jsx'
import './App.css'
import './style/reset.css'
import './style/normalize.css'

const App = () => {
    // 🎯 Общий режим: 'view' | 'edit' | 'training'
    const [mode, setMode] = useState(() => {
        if (window.location.pathname === '/training') return 'training'
        return 'view'
    })

    return (
        <Routes>
            <Route
                path="/collection"
                element={<EditThemePage mode={mode} setMode={setMode} />}
            />
            <Route
                path="/training"
                element={<TrainingPage mode={mode} setMode={setMode} />}
            />
        </Routes>
    )
}

export default App
