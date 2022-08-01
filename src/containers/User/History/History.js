import './History.scss'
import { useState, useEffect } from 'react'
import { getHistoryUser, handleDeleteHistory } from '../../../services/userServices'
import Card from './Card'

const History = ({ userId }) => {
    const [dataHistory, setDataHistory] = useState([])

    const getData = async (userId) => {
        const { data } = await getHistoryUser(userId)
        if (data?.errCode === 0) {
            setDataHistory(data.data)
        }
    }

    const handleDeleteClick = async (movieId) => {
        if (movieId) {
            const { data } = await handleDeleteHistory({
                id: movieId
            })

            console.log(movieId)

            if (data?.errCode === 0) {
                getData(userId)
            }
        }
    }

    useEffect(() => {
        getData(userId)
    }, [userId])


    return (
        <div className="history">
            {dataHistory?.length > 0 &&
                dataHistory.map((item, i) => (
                    <Card
                        handleDeleteClick={handleDeleteClick}
                        key={i}
                        category={item.category}
                        contentId={item.contentId}
                        movieId={item.id}
                    />
                ))
            }
        </div>
    )
}

export default History