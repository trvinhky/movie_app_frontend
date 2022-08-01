import './Loading.scss'

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading-container">
                {[...Array(9).fill()].map((item, i) => (
                    <div key={i}></div>
                ))}
            </div>
        </div>
    )
}

export default Loading