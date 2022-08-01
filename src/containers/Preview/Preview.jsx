import './Preview.scss'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import { useLocation } from 'react-router-dom'
import Trailer from './Trailer/Trailer'
import _ from 'lodash'

const Preview = () => {
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        setData(state.data)
    }, [data, state])

    return (
        <>
            <>
                <Header />
                {
                    data && !_.isEmpty(data) &&
                    <div className="preview">
                        <div className="container">
                            <div className="preview-container">
                                <div className="preview-intro">
                                    <div className="preview-intro__left">
                                        <img src={data.coverHorizontalUrl} alt={data.introduction} />
                                    </div>
                                    <div className="preview-intro__right">
                                        <h2 className="preview-intro__title">
                                            {data.introduction}
                                        </h2>
                                        <div className="preview-intro__group">
                                            <i className="fa-solid fa-heart"></i>
                                            {data.likeCount}
                                        </div>
                                    </div>
                                </div>
                                <Trailer
                                    data={data}
                                    setIsLoading={setIsLoading}
                                />
                                <div className="preview-more">
                                    <h3 className="preview-more__title">
                                        Liên Quan
                                    </h3>
                                    <div className="preview-more__list">
                                        {data.refList?.length > 0 &&
                                            data.refList.map((item, i) => (
                                                <div
                                                    className="preview-more__item"
                                                    key={i}
                                                >
                                                    <div className="preview-more__left">
                                                        <img
                                                            src={item.coverVerticalUrl}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                    <div className="preview-more__right">
                                                        <h4 className="preview-more__name">
                                                            {`${item.name} - ${item.year}`}
                                                        </h4>
                                                        <div className="preview-more__box">
                                                            <div className="preview-more__tag">
                                                                <p className="preview-more__tagName">
                                                                    Thể loại:
                                                                </p>
                                                                <div className="preview-more__tagList">
                                                                    {item.tagList?.length > 0 &&
                                                                        item.tagList.map((tag, idx) => (
                                                                            <span key={idx}>
                                                                                {tag.name}
                                                                                {idx === item.tagList.length - 1
                                                                                    ? '' : ','
                                                                                }
                                                                            </span>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="preview-more__btn">
                                                                <button>
                                                                    Xem Ngay
                                                                    <i className="fa-solid fa-caret-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />
            </>
            {isLoading && <Loading />}
        </>
    )
}

export default Preview