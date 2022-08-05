import Slider from '../../untils/Slider'
import './HomePage.scss'
import ListBanner from '../../components/ListBanner/ListBanner'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { getDataHome } from '../../services/APIServices'
import React, { useEffect, useState } from 'react'
import { MAX_PAGE } from '../../untils'
import Loading from '../../components/Loading/Loading'
//import { useNavigate } from 'react-router-dom'
import Search from './Search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetPage, selectPage } from '../../stores/userFeature/selectors'

const HomePage = () => {
    const [banner, setBanner] = useState([])
    const [listData, setListData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //const [previewData, setPreviewData] = useState([])
    //const navigate = useNavigate()
    const dispatch = useDispatch()
    const page = useSelector(selectPage)

    useEffect(() => {
        (async () => {
            const { data } = await getDataHome(page)
            if (data?.recommendItems) {
                const bannerFromData = data.recommendItems.filter(
                    item => item.bannerProportion !== null
                )
                const listFromData = data.recommendItems.filter(
                    item => item.bannerProportion === null
                )

                setBanner(bannerFromData)
                setListData(listFromData)
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        })()

    }, [page])

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await getPreviewVideos(page)
    //         if (data) {
    //             setPreviewData(data)
    //             setIsLoading(false)
    //         } else {
    //             setIsLoading(true)
    //         }
    //     })()

    // }, [page])

    const handlePaging = (e) => {
        dispatch(handleSetPage(e.target.value))
    }

    // const handleGoPreview = (data) => {
    //     navigate(`/preview/${data.name}`, {
    //         state: { data }
    //     })
    // }

    return (
        <>
            <>
                <Header />
                <div className="home-container">
                    <div className="container">
                        <div className="home-header">
                            <div className="home-slider">
                                {banner?.length > 0 &&
                                    <Slider
                                        slides={banner[0].recommendContentVOList}
                                    />
                                }
                            </div>
                            <div className="home-top">
                                <Search
                                    title={'Top Tìm Kiếm'}
                                />
                            </div>
                        </div>
                        <div className="home-body">
                            {listData?.length > 0 &&
                                listData.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <ListBanner
                                            title={item.homeSectionName}
                                            data={item.recommendContentVOList}
                                        />
                                        {/* {previewData?.length > 0
                                            && previewData.length > i
                                            && <div className="home-more">
                                                <div className="home-more__title">
                                                    Trailer
                                                </div>
                                                <div className="home-more__content">
                                                    <div className="home-more__box">
                                                        <div className="home-more__img">
                                                            <img src={previewData[i].coverHorizontalUrl} alt={previewData[i].name} />
                                                        </div>
                                                        <div className="home-more__text">
                                                            <h3 className="home-more__title">
                                                                {previewData[i].name}
                                                            </h3>
                                                            <div className="home-more__infor">
                                                                <div className="home-more__like">
                                                                    <i className="fa-solid fa-heart"></i>
                                                                    <span>{previewData[i].likeCount}</span>
                                                                </div>
                                                                <button
                                                                    className="home-more__watch"
                                                                    onClick={() => handleGoPreview(previewData[i])}
                                                                >
                                                                    Xem Ngay
                                                                    <i className="fa-solid fa-play"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        } */}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="home-footer">
                            <ul className="home-footer__paging">
                                {[...Array(MAX_PAGE).fill()].map((l, i) => (
                                    <li
                                        className={page === i ? "home-footer__item active" : "home-footer__item"}
                                        key={i}
                                        value={i}
                                        onClick={(e) => handlePaging(e)}
                                    >
                                        {i + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
            {isLoading && <Loading />}
        </>
    )
}

export default HomePage