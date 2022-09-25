import { Link } from "react-router-dom"
import boardLogo from '../../assets/img/board-logo.svg'

export const BoardMainHeader = () => {
    return (
        <header className='full board-layout board-main-header'>
            <div className='flex header-main-container'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <img src={boardLogo} alt='logo' />
                        Rello
                    </Link>
                    <button className='btn btn-transparent btn-create'>
                        Create
                    </button>
                </div>
                <div className='flex header-links'>
                    <Link to='/login' className='login-link'>Log in</Link>
                </div>
            </div>
        </header>
    )
}