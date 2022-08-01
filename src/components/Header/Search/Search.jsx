import { useState, useEffect } from 'react'
import './Search.scss'
import { useNavigate } from 'react-router-dom'
import { postSearchWithKeyword } from '../../../services/APIServices'

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const navigate = useNavigate()

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        (async () => {
            const { data } = await postSearchWithKeyword({
                searchKeyWord: searchInput,
                size: 50,
                sort: '',
                searchType: ''
            })
            if (data) {
                setDataSearch(data.searchResults)
            } else {
                setDataSearch([])
            }
        })()
    }, [searchInput])

    const handleGoWatch = (category, id, title) => {
        navigate(`/movies/${title}`, {
            state: {
                category,
                id
            }
        })
        setSearchInput('')
    }

    return (
        <div className="search">
            <input
                type="text" className="search-input"
                placeholder="Tìm kiếm..."
                value={searchInput}
                onChange={(e) => handleChangeInput(e)}
                id="search"
            />
            {dataSearch?.length > 0 &&
                <div className="search-more">
                    <div className="search-list">
                        {dataSearch.map((item, i) => (
                            <div
                                className="search-item"
                                key={i}
                                onClick={() => handleGoWatch(item.domainType, item.id, item.name)}
                            >
                                <div className="search-item__img">
                                    <img src={item.coverVerticalUrl} alt={item.name} />
                                </div>
                                <div className="search-item__content">
                                    <div className="search-item__title">
                                        {item.name}
                                    </div>
                                    <div className="search-item__category">
                                        <span>Thể loại: </span>
                                        {item.categoryTag?.length > 0 &&
                                            item.categoryTag.map((tag, idx) =>
                                                <span key={idx}>
                                                    {idx === item.categoryTag.length - 1
                                                        ? tag.name : `${tag.name}, `
                                                    }
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <span>
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>
        </div>
    )
}

export default Search;