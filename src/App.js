import { Route, Routes } from 'react-router-dom'
import { path } from './untils'
import Login from './containers/Login/Login'
import HomePage from './containers/HomePage/HomePage'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import User from './containers/User/User'
import Movies from './containers/Movies/Movies'
import Preview from './containers/Preview/Preview'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import AlertPage from './components/AlertPage/AlertPage'

const App = () => {
    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        const handleOnFirstLoadPage = () => {
            setIsAlert(true)
        }
        window.addEventListener('load', handleOnFirstLoadPage)

        return () => {
            window.removeEventListener('load', handleOnFirstLoadPage)
        }
    }, [isAlert])

    return (
        <>
            <Routes>
                <Route path={path.HOME} element={<HomePage />} />
                <Route
                    path={path.LOGIN}
                    element={<Login />}
                />
                <Route
                    path={path.REGISTER}
                    element={<Login />}
                />
                <Route path={path.USER} element={<User />} />
                <Route path={path.MOVIES} element={<Movies />} />
                <Route path={path.PREVIEW} element={<Preview />} />
                <Route path={path.FAVOURITE} element={<User />} />
                <Route path={path.HISTORY} element={<User />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {
                isAlert && <AlertPage setIsAlert={setIsAlert} />
            }
        </>
    )
}

export default App