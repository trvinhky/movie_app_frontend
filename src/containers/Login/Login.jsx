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
import Loading from './../../components/Loading/Loading'

const Login = () => {
    const [accountName, setAccountName] = useState('')
    const [password, setPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const [rule, setRule] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [imgBase64, setImgBase64] = useState('')
    const [type, setType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)
            if (type === 'login') {
                dispatch(userLogIn({ accountName, password }))
                    .unwrap()
                    .then((result) => {
                        if (result && !_.isEmpty(result)) {
                            setIsLoading(false)
                            toast.success('????ng nh???p th??nh c??ng!')
                            clearAllDataInput()
                            navigate(path.HOME, { replace: true })
                        } else {
                            setIsLoading(false)
                            toast.error('????ng nh???p th???t b???i. Vui l??ng th??? l???i!')
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        console.log(err)
                    })
            } else {
                const { data } = await createNewUser({
                    accountName,
                    password,
                    image: imgBase64,
                    role: 'R1',
                })
                setIsLoading(false)
                if (data?.errCode === 0) {
                    const text = 'T???o t??i kho???n th??nh c??ng. B???n mu???n ????ng nh???p ngay b??y gi??? ch???!'
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
                    toast.error('T???o t??i kho???n th???t b???i. Vui long th??? l???i!')
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
            placeholder: 'M???t kh???u',
            value: password
        },
        {
            type: 'matchPassword',
            placeholder: 'Nh???p l???i m???t kh???u',
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
        <>
            <div
                className="login"
                style={{
                    backgroundImage: 'url(https://github.com/trvinhky/image_app/blob/main/movie_app/background.jpg?raw=true)'
                }}
            >
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
                                    {type === 'login' ? '????ng Nh???p' : '????ng K??'}
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
                                            placeholder="Nh???p s??? ??i???n tho???i ho???c email"
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
                                        {type === 'login' ? '????ng Nh???p' : '????ng K??'}
                                    </button>
                                </div>
                                {rule && <div className="login-err">
                                    <small>Vui l??ng nh???p ch??nh x??c th??ng tin t??i kho???n</small>
                                </div>}
                                {type === 'login'
                                    ? <p className="login-infor">
                                        Qu??n m???t kh???u?
                                    </p>
                                    : <p className="login-accept">
                                        B???ng c??ch ch???n "????ng k?? t??i kho???n",
                                        b???n ?????ng ?? v???i c??c <span>??i???u kho???n s??? d???ng</span>
                                    </p>
                                }
                                <div className="login-other">
                                    <p className="login-other__text">
                                        <span>ho???c Ti???p t???c v???i</span>
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
                                        Ch??a c?? t??i kho???n ?
                                        <span
                                            onClick={() => handleClickLogin('register')}
                                        >????ng k??</span>
                                    </p>
                                    : <p className="login-choose">
                                        ???? c?? t??i kho???n ?
                                        <span
                                            onClick={() => handleClickLogin('login')}
                                        >????ng nh???p</span>
                                    </p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </>
    )
}

export default Login