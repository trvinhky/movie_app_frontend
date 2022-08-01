import Video from '../Video/Video'
import './ListVideo.scss'
import { useState, useLayoutEffect } from 'react'
import _ from 'lodash'

const ListVideo = ({ data, category, contentId }) => {
    const [currentData, setCurrentData] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)

    useLayoutEffect(() => {
        if (data?.length > 0) {
            setCurrentData(data[0])
        }
    }, [data])

    const toggleClass = (i) => {
        setActiveIndex((prev) => prev === i ? null : i)
        setCurrentData(data[activeIndex])
    }

    return (
        <div className="list-video">
            {
                data?.length > 0
                    ? <div className="list-video__container">
                        {currentData && !_.isEmpty(currentData) &&
                            <Video
                                data={currentData}
                                category={category}
                                contentId={contentId}
                            />
                        }
                        <div className="list-video__title">Tập Phim: </div>
                        <div className="list-video__btn">
                            <ul className="list-video__list">
                                {data.map((item, i) => (
                                    <li
                                        className={
                                            `list-video__item ${activeIndex === i ? 'active' : ''
                                            }`
                                        }
                                        onClick={() => toggleClass(i)}
                                        key={i}
                                    >
                                        {i + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <div className="list-video__error">
                        Có lỗi xảy ra. Vui lòng thử lại!
                    </div>
            }
        </div>
    )
}

export default ListVideo