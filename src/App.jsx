import { useState } from 'react'
import './App.css'
import './style/reset.css'
import './style/normalize.css'
import EditThemePage from './pages/EditTheme/EditThemePage.jsx'

const App = () => {
    return (
        <div className="App">
            <EditThemePage />
        </div>
    )
}

export default App
