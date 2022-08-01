import { Link, useResolvedPath, useMatch } from 'react-router-dom'

const NavLink = ({ children, path }) => {
    const resolved = useResolvedPath(path)
    const match = useMatch({ path: resolved.pathname, end: true })
    const className = match ? 'header-nav__item active' : 'header-nav__item'

    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
}

export default NavLink