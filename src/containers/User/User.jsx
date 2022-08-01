import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './User.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from '../../untils'
import { selectUserInfor, userLogOut } from '../../stores/userFeature/selectors'
import { useSelector, useDispatch } from 'react-redux'
import Favourite from './Favourite/Favourite'
import { useLocation } from 'react-router-dom'
import History from './History/History'
import { userUpdate } from '../../stores/userFeature/thunks'
import UserInfor from './UserInfor/UserInfor'

const User = () => {
    const [isActive, setActive] = useState(0)
    const [title, setTitle] = useState('Thông tin chung')
    const userInfor = useSelector(selectUserInfor)
    const [avatar, setAvatar] = useState(userInfor ? userInfor.image : '')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()

    const listChoose = [
        {
            id: 0,
            name: 'Thông tin chung',
            path: path.USER
        },
        {
            id: 1,
            name: 'Yêu thích',
            path: path.FAVOURITE
        },
        {
            id: 2,
            name: 'Lịch sử',
            path: path.HISTORY
        },
        {
            id: 3,
            name: 'Đăng Xuất',
            path: path.HOME
        }
    ]

    useEffect(() => {
        if (state) {
            setActive(state.id)
            setTitle(state.name)
        }
    }, [state])

    const toggleClass = (index, item) => {
        if (index === listChoose.length - 1) {
            dispatch(userLogOut())
            navigate(item.path, { replace: true })
        } else {
            navigate(item.path, {
                state: {
                    name: item.name,
                    id: item.id
                }
            })
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = ''
            let reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]

        if (file) {
            const objURL = URL.createObjectURL(file)
            getBase64(file)
                .then((result) => dispatch(userUpdate({
                    id: userInfor.id,
                    image: result
                })))
                .catch((err) => console.log(err))

            setAvatar(objURL)
        }
    }

    return (
        <>
            <Header />
            <div className="user">
                {userInfor &&
                    <div className="container">
                        <div className="user-profile">
                            <div className="user-profile__left">
                                <div className="user-profile__content">
                                    <div className="user-profile__infor">
                                        <div
                                            className="user-profile__avatar"
                                            style={{
                                                backgroundImage: `url(${avatar})`
                                            }}
                                        >
                                            <input
                                                type="file"
                                                id="avatar"
                                                hidden
                                                onChange={(e) => handleChangeAvatar(e)}
                                            />
                                            <label htmlFor="avatar">
                                                <i className="fa-solid fa-camera"></i>
                                            </label>
                                        </div>
                                        <p className="user-profile__text">
                                            Tài khoản của:
                                        </p>
                                        <h4 className="user-profile__name">
                                            {userInfor.accountName}
                                        </h4>
                                    </div>
                                    <ul className="user-profile__list">
                                        {listChoose.map((item, i) => (
                                            <li
                                                key={i}
                                                className={`user-profile__item ${isActive === i ? 'active' : ''
                                                    }`}
                                                onClick={() => toggleClass(i, item)}
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="user-profile__right">
                                <h2 className="user-profile__title">
                                    {title}
                                </h2>
                                {isActive === 0 &&
                                    <UserInfor userId={userInfor.id} />
                                }
                                {isActive === 1 &&
                                    <Favourite userId={userInfor.id} />
                                }
                                {isActive === 2 &&
                                    <History userId={userInfor.id} />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default User