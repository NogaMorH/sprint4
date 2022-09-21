import { Link } from 'react-router-dom'
import homeLogo from '../../assets/img/home-logo.svg'
// import { useRouteMatch } from "react-router-dom";

export const HomeHeader = () => {

    return (
        <header className='flex home-header'>
            <Link to='/' className='logo'>
                <img src={homeLogo} alt='logo' />
                Trello
            </Link>
            <div className='flex header-links'>
                <Link to='login' className='login-link'>Log in</Link>
                <Link to='login' className='login-link'>Sign up</Link>
                <Link to='board/b101' className='btn btn-wide'>Go to your boards</Link>
            </div>
        </header>
    )
}

