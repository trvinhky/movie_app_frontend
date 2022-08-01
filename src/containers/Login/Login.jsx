import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../untils'
import './Login.scss'
import { createNewUser } from '../../services/userServices'
import { toast } from 'react-toastify'
import Input from './Input'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogIn } from '../../stores/userFeature/thunks'
import _ from 'lodash'

const Login = () => {
    const [accountName, setAccountName] = useState('')
    const [password, setPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const [rule, setRule] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [imgBase64, setImgBase64] = useState('')
    const [type, setType] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (state) {
            setType(state.type)
        }
    }, [state])

    const handleChangeInput = (e, type) => {
        const data = e.target.value
        if (type === 'password') {
            setPassword(data)
        } else if (type === 'accountName') {
            setAccountName(data)
        } else {
            setMatchPassword(data)
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
                .then((result) => setImgBase64(result))
                .catch((err) => console.log(err))

            setAvatar(objURL)
        }
    }

    const validateForm = () => {
        const regexPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g

        const isPassword = regexPassword.test(password)
        const isEmail = regexEmail.test(accountName)
        const isPhone = regexPhone.test(accountName)
        const matches = password === matchPassword

        if (type === 'login') {
            return (isEmail || isPhone) && isPassword
        }
        return (isEmail || isPhone) && isPassword && matches && imgBase64
    }

    const clearAllDataInput = () => {
        setAvatar('')
        setAccountName('')
        setPassword('')
        setMatchPassword('')
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            if (type === 'login') {
                dispatch(userLogIn({ accountName, password }))
                    .unwrap()
                    .then((result) => {
                        if (result && !_.isEmpty(result)) {
                            toast.success('Đăng nhập thành công!')
                            clearAllDataInput()
                            navigate(path.HOME, { replace: true })
                        } else {
                            toast.error('Đăng nhập thất bại. Vui lòng thử lại!')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                const { data } = await createNewUser({
                    accountName,
                    password,
                    image: imgBase64,
                    role: 'R1',
                })
                if (data?.errCode === 0) {
                    toast.success('Tạo tài khoản thành công!')
                    const text = 'Bạn muốn đăng nhập ngay bây giờ chứ!'
                    if (window.confirm(text)) {
                        navigate(path.LOGIN, {
                            state: {
                                type: 'login'
                            }
                        })
                    } else {
                        clearAllDataInput()
                    }
                } else {
                    toast.error('Tạo tài khoản thất bại. Vui long thử lại!')
                }
            }
            setRule(false)
        } else {
            setRule(true)
        }
    }

    const inputPassword = [
        {
            type: 'password',
            placeholder: 'Mật khẩu',
            value: password
        },
        {
            type: 'matchPassword',
            placeholder: 'Nhập lại mật khẩu',
            value: matchPassword
        }
    ]

    const handleClickLogin = (type) => {
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
        <div className="login">
            <div className="container">
                <div className="login-logo">
                    <Link to={path.HOME}>
                        <span className="logo">
                            FMM
                        </span>
                    </Link>
                </div>
                <div className="login-container">
                    {
                        type &&
                        <div className="login-box">
                            <h3 className="login-title">
                                {type === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
                            </h3>
                            <div className="login-form">
                                {type !== 'login' &&
                                    <div
                                        className="login-avatar"
                                        style={{ backgroundImage: `url(${avatar})` }}
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
                                }
                                <div className="login-input">
                                    <input
                                        type="text"
                                        placeholder="Nhập số điện thoại hoặc email"
                                        value={accountName}
                                        onChange={(e) => handleChangeInput(e, 'accountName')}
                                    />
                                </div>
                                <Input
                                    type={type}
                                    dataFromParent={inputPassword}
                                    handleChangeInput={handleChangeInput}
                                />
                                <button
                                    className="btn-login"
                                    onClick={() => handleSubmit()}
                                >
                                    {type === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
                                </button>
                            </div>
                            {rule && <div className="login-err">
                                <small>Vui lòng nhập chính xác thông tin tài khoản</small>
                            </div>}
                            {type === 'login'
                                ? <p className="login-infor">
                                    Quên mật khẩu?
                                </p>
                                : <p className="login-accept">
                                    Bằng cách chọn "Đăng ký tài khoản",
                                    bạn đồng ý với các <span>Điều khoản sử dụng</span>
                                </p>
                            }
                            <div className="login-other">
                                <p className="login-other__text">
                                    <span>hoặc Tiếp tục với</span>
                                </p>
                                <div className="login-other__group">
                                    <div className="login-other__icon login-other__icon--facebook">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </div>
                                    <div className="login-other__icon login-other__icon--google">
                                        <i className="fa-brands fa-google"></i>
                                    </div>
                                </div>
                            </div>
                            {type === 'login'
                                ? <p className="login-choose">
                                    Chưa có tài khoản ?
                                    <span
                                        onClick={() => handleClickLogin('register')}
                                    >Đăng ký</span>
                                </p>
                                : <p className="login-choose">
                                    Đã có tài khoản ?
                                    <span
                                        onClick={() => handleClickLogin('login')}
                                    >Đăng nhập</span>
                                </p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login