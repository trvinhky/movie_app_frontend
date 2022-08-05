import './Search.scss'
import { useState, useEffect } from 'react'
import { getSearchLeaderBoard } from '../../../services/APIServices'
import { useNavigate } from 'react-router-dom'

const Search = ({ title }) => {
    const [listSearch, setListSearch] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const { data } = await getSearchLeaderBoard()
            if (data) {
                setListSearch(data.list)
            }
        })()

    }, [])

    const handleGoWatch = (category, id, title) => {
        navigate(`/movies/${title}`, {
            state: {
                category,
                id
            }
        })
    }

    return (
        <div className="top-search">
            <div className="top-search__title">
                {title}
            </div>
            <ul className="top-search__list">
                {listSearch?.length > 0 &&
                    listSearch.map(item => (
                        <li
                            className="top-search__item"
                            key={item.id}
                            onClick={() => handleGoWatch(item.domainType, item.id, item.title)}
                        >
                            <img
                                src={item.cover} alt={item.title}
                                className="top-search-item__img"
                            />
                            <div className="top-search-item__group">
                                <h4 className="top-search-item__title">
                                    {item.title}
                                </h4>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Search