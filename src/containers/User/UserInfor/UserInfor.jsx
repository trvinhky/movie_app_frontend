import './UserInfor.scss'
import { useState, useEffect } from 'react'
import { getFavouriteUser, getHistoryUser } from '../../../services/userServices'

const UserInfor = ({ userId }) => {
    const [likeCount, setLikeCount] = useState(0)
    const [watchCount, setWatchCount] = useState(0)

    const getLikeCount = async (userId) => {
        const { data } = await getFavouriteUser(userId)
        if (data?.errCode === 0) {
            setLikeCount(data.data.length)
        }
    }

    const getWatchCount = async (userId) => {
        const { data } = await getHistoryUser(userId)
        if (data?.errCode === 0) {
            setWatchCount(data.data.length)
        }
    }

    useEffect(() => {
        getWatchCount(userId)
        getLikeCount(userId)
    }, [userId])

    return (
        <div className="user-infor">
            <div className="user-infor__conatiner">
                <div className="user-infor__content">
                    <div className="user-infor__view">
                        <p>Tổng số movie đã xem: </p>
                        <span>{watchCount} <i className="fa-solid fa-video"></i></span>
                    </div>
                    <div className="user-infor__like">
                        <p>Tổng số movie đã thích: </p>
                        <span>{likeCount} <i className="fa-solid fa-heart"></i></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfor