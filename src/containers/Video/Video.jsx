import './Video.scss'
import { useState, useEffect } from 'react'
import { getMovieMedia } from '../../services/APIServices'
import ReactPlayer from 'react-player'
import { selectUserInfor } from '../../stores/userFeature/selectors'
import { useSelector } from 'react-redux'
import { createNewHistory } from '../../services/userServices'

const Video = ({ data, category, contentId }) => {
    const [movies, setMovies] = useState({})
    const [quality, setQuality] = useState([])
    const [qualityCurrent, setQualityCurrent] = useState(data ? data.definitionList[0].code : '')
    const [activeIndex, setActiveIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [listSub, setListSub] = useState([])
    const userInfor = useSelector(selectUserInfor)

    useEffect(() => {

        const fetchData = async () => {
            const res = await getMovieMedia({
                category: category,
                contentId: contentId,
                episodeId: data.id,
                definition: qualityCurrent
            })
            setMovies(res.data)
        }

        if (data) {
            setQuality(data.definitionList)
            buildListSub(data.subtitlingList)
            fetchData()
        }

    }, [data, qualityCurrent, contentId, category])

    const buildListSub = (data) => {
        const result = []
        if (data?.length > 0) {
            data.map((item, i) => {
                let temp = {
                    kind: "subtitles",
                    src: item.subtitlingUrl,
                    srcLang: item.languageAbbr,
                    label: item.language,
                    default: false,
                    color: 'white'
                }

                if (i === 0) {
                    temp = {
                        ...temp,
                        default: true
                    }
                }

                return result.push(temp)
            })
        }

        setListSub(result)
    }

    const playingProps = {
        url: movies?.mediaUrl,
        width: '100%',
        height: '100%',
        light: 'https://github.com/trvinhky/image_app/blob/main/movie_app/background-3d.jpg?raw=true',
        playing: playing,
        controls: true,
        config: {
            file: {
                attributes: {
                    crossOrigin: "anonymous",
                },
                tracks: listSub
            }
        }
    }

    // const formatTime = (time) => {
    //     const date = new Date(time * 1000)
    //     const hour = date.getUTCHours()
    //     const minute = date.getUTCMinutes()
    //     const second = ('0' + date.getUTCSeconds()).slice(-2)
    //     if (hour) {
    //         return `${hour}:${('0' + minute).slice(-2)}:${second}`
    //     }
    //     return `${minute}:${second}`
    // }

    const handleChangeQuality = (i) => {
        setActiveIndex((prev) => prev === i ? null : i)
        setQualityCurrent(quality[i].code)
        setPlaying(true)
    }

    const handleOnStart = async () => {
        if (data && category && contentId && userInfor) {
            let definition = ''

            data.definitionList.map((item, i) => {
                let result = i === 0 ? item.code : ` ${item.code}`
                return definition += result
            })

            const history = {
                userId: userInfor.id,
                contentId,
                category,
                episodeId: data.id,
                definition
            }
            await createNewHistory(history)
        }
    }

    const handleOnError = () => {
        window.alert('Có lỗi xảy ra. Vui lòng tại lại trang!')
    }

    return (
        <div className="video">
            {movies &&
                <div className="video-container">
                    <ReactPlayer
                        {...playingProps}
                        onStart={() => handleOnStart()}
                        onError={() => handleOnError()}
                    />
                    <div className="video-controls">
                        <i className="fa-solid fa-bars"></i>
                        <div className="video-quality">
                            <p className="video-quality__title">Chất lượng</p>
                            <div className="video-quality__list">
                                {quality?.length > 0 &&
                                    quality.map((item, i) => (
                                        <button
                                            className={
                                                activeIndex === i
                                                    ? "video-quality__item active"
                                                    : "video-quality__item"
                                            }
                                            key={i}
                                            onClick={() => handleChangeQuality(i)}
                                        >{item.description}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Video