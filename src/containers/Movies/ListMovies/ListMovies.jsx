import Slider from 'react-slick'
import './ListMovies.scss'
import { useNavigate } from 'react-router-dom'
import { path } from './../../../untils/constant'

const ListMovies = ({ title, data }) => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const navigate = useNavigate()

    function SampleNextArrow(props) {
        const { className, onClick } = props
        return (
            <span
                className={`${className} list-movies-next`}
                onClick={onClick}
            ></span>
        )
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props
        return (
            <span
                className={`${className} list-movies-prev`}
                onClick={onClick}
            ></span>
        )
    }

    const handleGoWatch = () => {
        navigate(path.VIDEO)
    }

    return (
        <div className="list-movies">
            <div className="list-movies__container">
                <div className="list-movies__title">
                    {title}
                </div>
                <div className="list-movies__box">
                    <Slider {...settings}>
                        {data?.length > 0 && data.map((item, i) => (
                            <div
                                className="list-movies__cart"
                                key={i}
                                onClick={() => handleGoWatch()}
                            >
                                <img src={item.coverVerticalUrl} alt={item.name} />
                                <h3>{item.name}</h3>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default ListMovies