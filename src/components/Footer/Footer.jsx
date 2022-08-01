import './Footer.scss'
import { path } from '../../untils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleSetPage } from '../../stores/userFeature/selectors'

const Footer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoHome = () => {
        dispatch(handleSetPage(0))
        navigate(path.HOME)
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-container">
                    <div className="footer-infor">
                        <div className="footer-infor__left">
                            <span className="logo" onClick={() => handleGoHome()}>
                                FMM
                            </span>
                            <p className="footer-infor__text">
                                Mạng xã hội chia sẻ các nội dung video giải trí chất lượng cao, phù hợp mọi độ tuổi và an toàn cho trẻ em.
                            </p>
                        </div>
                        <div className="footer-infor__right">
                            <h4 className="footer-infor__title">
                                Liên hệ
                            </h4>
                            <p className="footer-infor__more">
                                <span>Địa chỉ:</span>
                                <span>Phước Long, Bạc Liêu</span>
                            </p>
                            <p className="footer-infor__more">
                                <span>Số điện thoại:</span>
                                <span>0947468740</span>
                            </p>
                            <p className="footer-infor__more">
                                <span>Email:</span>
                                <a href="mailto:vinhky26032002@gmail.com">
                                    vinhky26032002@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="footer-author">
                        © 2022 FMM. Mọi bản quyền thuộc về FMM.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer