import './Header.scss'
import { path } from '../../untils'
import { Link } from 'react-router-dom'
import Search from './Search/Search'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
//import NavLink from './NavLink'
import { userLogOut, selectUserInfor, selectIsLogIn, handleSetPage } from '../../stores/userFeature/selectors'
import { useDispatch, useSelector } from 'react-redux'
import List from './List/List'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogIn = useSelector(selectIsLogIn)
    const userInfor = useSelector(selectUserInfor)

    // const listNav = [
    //     {
    //         name: 'Home',
    //         path: path.HOME
    //     },
    //     {
    //         name: 'TV',
    //         path: path.TV
    //     }
    // ]

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

    const handleGoHome = () => {
        dispatch(handleSetPage(0))
        navigate(path.HOME)
    }

    const handleLogout = () => {
        dispatch(userLogOut())
        navigate(path.HOME)
    }

    return (
        <>
            <header className="header">
                <nav className="container header-nav">
                    <div className="header-nav__link">
                        <span className="logo" onClick={() => handleGoHome()}>
                            FMM
                        </span>
                        <div className="header-nav__list">
                            {/* {listNav.map((item, i) => (
                                <NavLink path={item.path} key={i}>
                                    {item.name}
                                </NavLink>
                            ))} */}
                        </div>
                    </div>
                    <div className="header-nav__group">
                        <Search />
                        {
                            !isLogIn &&
                            <div className="group-btn">
                                <button
                                    className="btn btn--login"
                                    onClick={() => handleLogin('login')}
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    className="btn btn--register"
                                    onClick={() => handleLogin('register')}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        }
                        <div className="avatar">
                            <label className="avatar-img" htmlFor="toggle">
                                {
                                    (isLogIn && !_.isEmpty(userInfor))
                                        ? <img src={userInfor.image} alt="avatar" />
                                        : <i className="fa-solid fa-user"></i>
                                }
                            </label>
                            <input type="checkbox" id="toggle" hidden />
                            <List isLogIn={isLogIn} />
                            {
                                isLogIn &&
                                <div className="avatar-choose">
                                    <Link to={path.USER}>
                                        <div className="avatar-item">
                                            Thông tin
                                        </div>
                                    </Link>
                                    <div
                                        className="avatar-item"
                                        onClick={() => handleLogout()}
                                    >
                                        Đăng xuất
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header