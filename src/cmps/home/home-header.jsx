import { Link } from 'react-router-dom'
import homeLogo from '../../assets/img/home-logo.svg'
// import { useRouteMatch } from "react-router-dom";

export const HomeHeader = () => {

    return (
        <header className='flex home-header'>
            <Link to='/' className='logo'>
                <img src={homeLogo} alt='logo' />
                Rello
            </Link>
            <div className='flex header-links'>
                <Link to='login' className='login-link'>Log in</Link>
                <Link to='board/632d810011800c29acdba9e0' className='btn btn-wide'>Get Rello for free</Link>
            </div>
        </header>
    )
}

