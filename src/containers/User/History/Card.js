import { getMoviesDetail } from '../../../services/APIServices'
import React, { useEffect, useState } from 'react'
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
                <div className="history-container">
                    <div
                        className="history-wapper"
                        onClick={() => handleGoWatch(
                            category,
                            contentId,
                            dataMovie.name
                        )}
                    >
                        <img
                            src={dataMovie.coverVerticalUrl}
                            alt={dataMovie.name}
                            className="history-img"
                        />
                        <div className="history-card">
                            <h3 className="history-card__title">
                                {`${dataMovie.name} ${dataMovie.year}`}
                            </h3>
                            <div className="history-card__category">
                                <span>Thể loại: </span>
                                {dataMovie.tagNameList?.length > 0 &&
                                    dataMovie.tagNameList.map((item, i) => (
                                        <React.Fragment key={i}>
                                            <span>{item}</span>
                                            {i === dataMovie.tagNameList.length - 1 ? '' : ', '}
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <span
                        className="history-delete"
                        onClick={() => handleDeleteClick(movieId)}
                    >&times;</span>
                </div>
            }
        </>
    )
}

export default Card