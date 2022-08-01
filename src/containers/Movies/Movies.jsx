import { useState, useEffect } from 'react'
import './Movies.scss'
import { getMoviesDetail } from '../../services/APIServices'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import MovieInfor from '../MovieInfor/MovieInfor'
import ListMovies from './ListMovies/ListMovies'
import MoviesInfor from './MoviesInfor/MoviesInfor'
import { useLocation } from 'react-router-dom'
import ListVideo from '../ListVideo/ListVideo'

const Movies = () => {
    const [moviesData, setMoviesData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { state } = useLocation()

    useEffect(() => {
        (async () => {
            const res = await getMoviesDetail({
                id: state.id,
                category: state.category
            })
            if (res) {
                setMoviesData(res.data)
                setIsLoading(false)
            }
        })()

    }, [state.id, state.category])

    return (
        <>
            <>
                <Header />
                <div className="movies">
                    <div className="container">
                        {moviesData &&
                            <div className="movies-container">
                                <MovieInfor
                                    data={{
                                        contentId: moviesData.id,
                                        category: moviesData.category
                                    }}
                                    backgroundUrl={moviesData.coverHorizontalUrl}
                                    imgUrl={moviesData.coverVerticalUrl}
                                    title={moviesData.name}
                                    introduction={moviesData.introduction}
                                    year={moviesData.year}
                                    tagList={moviesData.tagList}
                                    height={'60vh'}
                                />
                                {moviesData.starList?.length > 0 &&
                                    <div className="movies-cast">
                                        <div className="movies-cast__title">
                                            Diễn Viên
                                        </div>
                                        <div className="movies-cast__group">
                                            {moviesData.starList?.length > 0 &&
                                                moviesData.starList.map((item, i) => (
                                                    <div
                                                        className="movies-cast__card"
                                                        key={i}
                                                    >
                                                        <img src={item.image} alt={item.localName} />
                                                        <h4>{item.localName}</h4>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                                <div className="movies-play">
                                    {moviesData.episodeVo &&
                                        <ListVideo
                                            data={moviesData.episodeVo}
                                            category={moviesData.category}
                                            contentId={moviesData.id}
                                        />
                                    }
                                </div>
                                {moviesData.refList?.length > 0 &&
                                    <div className="movies-more">
                                        <ListMovies
                                            title={'Đề Cử'}
                                            data={moviesData.refList}
                                        />
                                    </div>
                                }
                                {
                                    moviesData.likeList?.length > 0 &&
                                    <div className="movies-nominations">
                                        <MoviesInfor data={moviesData.likeList} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </>
            {isLoading && <Loading />}
        </>
    )
}

export default Movies