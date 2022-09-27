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
                <Link to='board/6332aabf11800c29ac0b93af' className='btn btn-wide'>Get Rello for free</Link>
            </div>
        </header>
    )
}

