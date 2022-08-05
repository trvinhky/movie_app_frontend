import Slider from 'react-slick'
import './ListBanner.scss'
import { useNavigate } from 'react-router-dom'

const ListBanner = ({ title, data }) => {
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
                className={`${className} list-banner-next`}
                onClick={onClick}
            ></span>
        )
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props
        return (
            <span
                className={`${className} list-banner-prev`}
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
        <div className="list-banner">
            <div className="list-banner__container">
                <div className="list-banner__title">
                    {title}
                </div>
                <div className="list-banner__box">
                    <Slider {...settings}>
                        {data?.length > 0 && data.map((item, i) => (
                            <div
                                className="list-banner__cart"
                                key={i}
                                onClick={() => handleGoWatch(item.category, item.id, item.title)}
                            >
                                <img src={item.imageUrl} alt={item.title} />
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default ListBanner