import './Favourite.scss'
import { useState, useEffect } from 'react'
import { getFavouriteUser, handleDeleteFavourite } from '../../../services/userServices'
import Card from './Card'

const Favourite = ({ userId }) => {
    const [dataFavourite, setDataFavourite] = useState([])

    const getData = async (userId) => {
        const { data } = await getFavouriteUser(userId)
        if (data?.errCode === 0) {
            setDataFavourite(data.data)
        }
    }

    useEffect(() => {
        getData(userId)
    }, [userId])

    const handleDeleteClick = async (movieId) => {
        if (movieId) {
            const { data } = await handleDeleteFavourite({
                id: movieId
            })

            if (data?.errCode === 0) {
                getData(userId)
            }
        }
    }



    return (
        <div className="favourite">
            {dataFavourite?.length > 0 &&
                dataFavourite.map((item, i) => (
                    <Card
                        category={item.category}
                        contentId={item.contentId}
                        movieId={item.id}
                        handleDeleteClick={handleDeleteClick}
                        key={i}
                    />
                ))
            }
        </div>
    )
}

export default Favourite