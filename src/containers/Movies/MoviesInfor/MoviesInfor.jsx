import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import './MoviesInfor.scss'

const MoviesInfor = ({ data }) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    }

    const navigate = useNavigate()

    function SampleNextArrow(props) {
        const { className, onClick } = props
        return (
            <span
                className={`${className} movies-infor-next`}
                onClick={onClick}
            ></span>
        )
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props
        return (
            <span
                className={`${className} movies-infor-prev`}
                onClick={onClick}
            ></span>
        )
    }

    const handleGoWatch = (category, id, title) => {
        navigate(`/movies/${title}`, {
            state: {
                category,
                id
            }
        })
    }

    return (
        <div className="movies-infor">
            <div className="movies-infor__title">
                Liên Quan
            </div>
            <div className="movies-infor__box">
                <Slider {...settings}>
                    {data?.length > 0 && data.map((item, i) => (
                        <div
                            className="movies-infor__cart"
                            key={i}
                            onClick={() => handleGoWatch(item.category, item.id, item.name)}
                        >
                            <div
                                className="movies-infor__group"
                                style={{ backgroundImage: `url(${item.coverHorizontalUrl})` }}
                            >
                                <div className="movies-infor__left">
                                    <img src={item.coverVerticalUrl} alt={item.name} />
                                </div>
                                <div className="movies-infor__right">
                                    <h3>{`${item.name} - ${item.year}`}</h3>
                                    <div className="movies-infor__category">
                                        <p>Thể Loại: </p>
                                        <div className="movies-infor__list">
                                            {item.tagList?.length > 0 &&
                                                item.tagList.map((tag, i) => (
                                                    <div key={i}>
                                                        <span
                                                            className="movies-infor__item"
                                                            value={tag.id}
                                                        >
                                                            {tag.name}
                                                        </span>
                                                        {
                                                            i === item.tagList.length - 1
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
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default MoviesInfor