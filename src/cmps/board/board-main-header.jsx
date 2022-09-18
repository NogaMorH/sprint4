import { Link } from "react-router-dom"
import boardLogo from '../../assets/img/board-logo.svg'

export const BoardMainHeader = () => {
    return (
        <header className='flex full board-layout board-main-header'>
            <div className='flex header-main-container'>
                <Link to='/' className='logo'>
                    <img src={boardLogo} alt='logo' />
                    Trello
                </Link>
                <button className='btn btn-transparent btn-create'>Create</button>
            </div>
            <div className='flex header-links'>
                <Link to='login' className='login-link'>Log in</Link>
                <Link to='login' className='login-link'>Sign up</Link>
            </div>
        </header>
    )
}