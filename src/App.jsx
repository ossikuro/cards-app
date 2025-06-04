import { Routes, Route } from 'react-router-dom'
import './App.css'
import './style/reset.css'
import './style/normalize.css'
import EditThemePage from './pages/EditTheme/EditThemePage.jsx'
import TrainingPage from './pages/Training/TrainingPage.jsx'

const App = () => {
    return (
        <Routes>
            <Route path="/collection" element={<EditThemePage />} />
            <Route path="/training" element={<TrainingPage />} />
        </Routes>
    )
}

export default App
