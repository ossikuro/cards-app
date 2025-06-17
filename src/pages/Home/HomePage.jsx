import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'

const HomePage = () => {
    const navigate = useNavigate()
    const [collections, useCollections] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    return (
        <>
            <Header></Header>
        </>
    )
}

// export default HomePage
