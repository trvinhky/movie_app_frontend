import { useState, useEffect } from 'react'

const Input = ({ type, dataFromParent, handleChangeInput }) => {
    const [data, setData] = useState([])
    const [isActive, setActive] = useState(null)

    useEffect(() => {
        if (type === 'login') {
            setData(dataFromParent.filter((l, i) => i !== dataFromParent.length - 1))
        } else {
            setData(dataFromParent)
        }
    }, [type, dataFromParent])

    const handleChecked = (index) => {
        setActive((isActive) => (isActive === index ? null : index))
    }

    return (
        <>
            {data?.length > 0 && data.map((item, i) => (
                <div className="login-input" key={i}>
                    <div className="login-more">
                        <input
                            type={isActive === i ? 'text' : 'password'}
                            placeholder={item.placeholder}
                            value={item.value}
                            onChange={(e) => handleChangeInput(e, item.type)}
                        />
                        {isActive === i
                            ? <span onClick={() => handleChecked(i)}>
                                <i className="fa-solid fa-eye"></i>
                            </span>
                            : <span onClick={() => handleChecked(i)}>
                                <i className="fa-solid fa-eye-slash"></i>
                            </span>
                        }
                    </div>
                </div>
            ))}
        </>
    )

}

export default Input