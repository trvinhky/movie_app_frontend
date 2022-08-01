import './Trailer.scss'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import img from '../../../assets/images/background-3d.jpg'
import { postPreviewVideoMedia } from '../../../services/APIServices'
import _ from 'lodash'

const Trailer = ({ data, setIsLoading }) => {
    const [trailer, setTrailer] = useState({})
    const [error, setError] = useState(false)
    const [quality, setQuality] = useState([])
    const [qualityCurrent, setQualityCurrent] = useState(
        data?.mediaInfo ? data.mediaInfo.definitionList[0].code : ''
    )
    const [playing, setPlaying] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const fetchData = async (category, contentId, episodeId, definition) => {
            const res = await postPreviewVideoMedia([{
                category,
                contentId,
                episodeId: episodeId.id,
                definition
            }])
            setTrailer(res.data[0])
        }
        if (!_.isEmpty(data) && data?.mediaInfo) {
            fetchData(
                data.category,
                data.id,
                data.mediaInfo,
                qualityCurrent
            )
            setQuality(data.mediaInfo.definitionList)
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }

    }, [data, setIsLoading, qualityCurrent])

    const playingProps = {
        url: trailer?.mediaUrl,
        width: '100%',
        height: '100%',
        light: img,
        playing: playing,
        controls: true
    }

    const handleChangeQuality = (i) => {
        setActiveIndex((prev) => prev === i ? null : i)
        setQualityCurrent(quality[i].code)
        setPlaying(true)
    }

    return (
        <div className="trailer">
            {!_.isEmpty(trailer) &&
                <div className="trailer-container">
                    <ReactPlayer
                        {...playingProps}
                        onError={() => setError(true)}
                    />
                    <div className="trailer-controls">
                        <i className="fa-solid fa-bars"></i>
                        <div className="trailer-quality">
                            <p className="trailer-quality__title">Chất lượng</p>
                            <div className="trailer-quality__list">
                                {quality?.length > 0 &&
                                    quality.map((item, i) => (
                                        <button
                                            className={
                                                activeIndex === i
                                                    ? "trailer-quality__item active"
                                                    : "trailer-quality__item"
                                            }
                                            key={i}
                                            onClick={() => handleChangeQuality(i)}
                                        >{item.description}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {
                        error &&
                        <p className="trailer-error">
                            Có Lỗi xảy ra vui lòng tải lại trang.
                        </p>
                    }
                </div>
            }
        </div>
    )
}

export default Trailer