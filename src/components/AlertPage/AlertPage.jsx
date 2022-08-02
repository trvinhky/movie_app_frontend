import './AlertPage.scss'

const AlertPage = ({ setIsAlert }) => {
    return (
        <div className="alert">
            <div
                className="alert-conatiner"
                style={{
                    borderImage: `url(https://github.com/trvinhky/image_app/blob/main/movie_app/border.jpg?raw=true) 30 stretch`
                }}
            >
                <h2 className="alert-title">
                    Thông báo
                </h2>
                <div className="alert-content">
                    <p>
                        Lời đầu tiên Admin xin cảm ơn bạn đã ghé thăm trang web của mình!
                    </p>
                    Trong quá trình trải nghiệm trang web, mình xin lỗi vì 1 số bất tiện do
                    trang web còn đang trong quá trình phát triển nên còn 1 số lỗi, mình sẽ sớm khắc
                    phục và thêm 1 số tính năng mới. Mọi góp ý và thắc mắc bạn vui lòng góp ý qua các
                    phương thức sau:
                </div>
                <div className="alert-end">
                    <p>Zalo:<span>0947468740</span></p>
                    <p>Facebook:
                        <a
                            href="https://www.facebook.com/ky.trvinh/"
                            target="_blank" rel="noopener noreferrer"
                        >
                            {`Click vào đây nè ><`}
                        </a>
                    </p>
                    <div>
                        Hoặc gởi email cho mình bằng cách click vào phần email dưới cuối trang web nha!
                    </div>
                </div>
                <span className="alert-icon" onClick={() => setIsAlert(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
            </div>
        </div>
    )
}

export default AlertPage