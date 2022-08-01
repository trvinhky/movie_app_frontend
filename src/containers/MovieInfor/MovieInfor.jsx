import { useState, useEffect } from 'react'
import { createNewFavourite, handleDeleteFavourite, getFavouriteUser } from '../../services/userServices'
import './MovieInfor.scss'
import { useSelector } from 'react-redux'
import { selectUserInfor } from '../../stores/userFeature/selectors'

const MovieInfor = (props) => {
    const { backgroundUrl, imgUrl, title, introduction, year, tagList, height, data } = props
    const [liked, setLiked] = useState(false)
    const userInfor = useSelector(selectUserInfor)
    const [userId, setUserId] = useState(null)
    const [movieId, setMovieId] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await getFavouriteUser(userInfor.id)
            if (res?.data?.errCode === 0) {
                const dataMovie = res.data.data.find((item) =>
                    item.category === data.category
                    && item.contentId === +data.contentId
                )
                if (dataMovie) {
                    setLiked(true)
                    setMovieId(dataMovie.id)
                }
                else setLiked(false)
            }
        })()

        if (userInfor) {
            setUserId(userInfor.id)
        }
    }, [userInfor, data.category, data.contentId, liked])

    const handleAddLike = async () => {
        const buildData = {
            ...data,
            userId
        }

        if (liked) {
            const res = await handleDeleteFavourite({
                id: movieId
            })

            if (res?.data?.errCode === 0) {
                setLiked(false)
            }
        } else {
            const res = await createNewFavourite(buildData)
            if (res?.data?.errCode === 0) {
                setLiked(true)
            }
        }
    }

    return (
        <div className="movie-infor">
            <div
                className="movie-infor__container"
                style={{
                    backgroundImage: `url(${backgroundUrl})`,
                    height: `${height}`
                }}
            >
                <div
                    className={liked ? "movie-inofor__like active" : "movie-inofor__like"}
                    onClick={() => handleAddLike()}
                >
                    <i className="fa-solid fa-heart"></i>
                </div>
                <div className="movie-infor__group">
                    <div className="movie-infor__left">
                        <img
                            src={imgUrl}
                            alt={title}
                        />
                    </div>
                    <div className="movie-infor__right">
                        <h1 className="movie-infor__title">
                            {title}
                        </h1>
                        <p>{introduction}</p>
                        <h6><span>Năm:</span>{year}</h6>
                        <div className="movie-infor__category">
                            <span className="movie-infor__name">
                                Thể loại:
                            </span>
                            <div className="movie-infor__list">
                                {tagList?.length > 0 &&
                                    tagList.map((item, i) => (
                                        <div key={i}>
                                            <span
                                                className="movie-infor__item"
                                                value={item.id}
                                            >
                                                {item.name}
                                            </span>
                                            {
                                                i === tagList.length - 1
                                                    ? '' : <span>,</span>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfor