import React from 'react'
import classNames from 'classnames'
import '../styles/cssSlider.scss'

class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.IMAGE_PARTS = 1
        this.changeTO = null
        this.AUTOCHANGE_TIME = 4000
        this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false }
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO)
    }

    componentDidMount() {
        this.runAutochangeTO()
        setTimeout(() => {
            this.setState({ activeSlide: 0, sliderReady: true })
        }, 0);
    }

    runAutochangeTO() {
        this.changeTO = setTimeout(() => {
            this.changeSlides(1)
            this.runAutochangeTO()
        }, this.AUTOCHANGE_TIME)
    }

    changeSlides(change) {
        window.clearTimeout(this.changeTO)
        const { length } = this.props.slides
        const prevSlide = this.state.activeSlide
        let activeSlide = prevSlide + change
        if (activeSlide < 0) activeSlide = length - 1
        if (activeSlide >= length) activeSlide = 0
        this.setState({ activeSlide, prevSlide })
    }

    render() {
        const { activeSlide, prevSlide, sliderReady } = this.state
        const { slides } = this.props

        return (
            <div className={classNames('slider', { 's--ready': sliderReady })}>
                {/* <p className="slider__top-heading">
                    Travelers
                </p> */}
                <div className="slider__slides">
                    {slides.map((slide, index) => (
                        <div
                            className={
                                classNames('slider__slide',
                                    {
                                        's--active': activeSlide === index,
                                        's--prev': prevSlide === index
                                    })
                            }
                            key={index}
                        >
                            <div className="slider__slide-content">
                                <h3 className="slider__slide-subheading">
                                    {slide.contentType}
                                </h3>
                                <h2 className="slider__slide-heading">
                                    <span>{slide.title}</span>
                                    {/* {slide.title.split(' ').map((l, i) => <span key={i}>{l}</span>)} */}
                                </h2>
                            </div>
                            <div className="slider__slide-parts">
                                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                    <div
                                        className="slider__slide-part"
                                        key={i}
                                    >
                                        <div
                                            className="slider__slide-part-inner"
                                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="slider__control"
                    onClick={() => this.changeSlides(-1)}
                ></div>
                <div
                    className="slider__control slider__control--right"
                    onClick={() => this.changeSlides(1)}
                ></div>
            </div>
        )
    }
}

export default Slider