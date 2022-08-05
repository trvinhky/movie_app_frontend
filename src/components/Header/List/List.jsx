import './List.scss'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../../../stores/userFeature/selectors'
import { Link } from 'react-router-dom'
import { path } from '../../../untils'
import { useNavigate } from 'react-router-dom'

const List = ({ isLogIn }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (type) => {
        if (type === 'login') {
            navigate(path.LOGIN, {
                state: { type }
            })
        } else {
            navigate(path.REGISTER, {
                state: { type }
            })
        }
    }

    return (
        <div className="list">
            <div className="list-choose">
                {!isLogIn ?
                    <>
                        <div
                            className="list-choose__item"
                            onClick={() => handleLogin('login')}
                        >
                            Đăng nhập
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </div>
                        <div
                            className="list-choose__item"
                            onClick={() => handleLogin('register')}
                        >
                            Đăng ký
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </>
                    :
                    <>
                        <Link to={path.USER}>
                            <div className="list-choose__item">
                                Thông tin
                                <i className="fa-solid fa-address-card"></i>
                            </div>
                        </Link>
                        <div
                            className="list-choose__item"
                            onClick={() => dispatch(userLogOut())}
                        >
                            Đăng xuất
                            <i className="fa-solid fa-left-long"></i>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default List