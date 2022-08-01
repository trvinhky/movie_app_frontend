import { getMoviesDetail } from '../../../services/APIServices'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

const Card = ({ category, contentId, handleDeleteClick, movieId }) => {
    const [dataMovie, setDataMovie] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const res = await getMoviesDetail({
                id: contentId,
                category
            })
            if (res) {
                setDataMovie(res.data)
            }
        })()
    }, [category, contentId])

    const handleGoWatch = (category, id, title) => {
        navigate(`/movies/${title}`, {
            state: {
                category,
                id
            }
        })
    }

    return (
        <>
            {
                !_.isEmpty(dataMovie) &&
                <div className="favourite-card">
                    <div
                        className="favourite-wapper"
                        onClick={() => handleGoWatch(
                            category,
                            contentId,
                            dataMovie.name
                        )}
                    >
                        <img
                            className="favourite-card__img"
                            src={dataMovie.coverVerticalUrl}
                            alt={dataMovie.name}
                        />
                        <div className="favourite-card__content">
                            <h3 className="favourite-card__name">
                                {dataMovie.name}
                            </h3>
                            <p className="favourite-card__year">
                                <span>Năm: </span> {dataMovie.year}
                            </p>
                        </div>
                    </div>
                    <div
                        className="favourite-card__delete"
                        onClick={() => handleDeleteClick(movieId)}
                    >
                        <i className="fa-solid fa-delete-left"></i>
                    </div>
                </div>
            }
        </>
    )
}

export default Card