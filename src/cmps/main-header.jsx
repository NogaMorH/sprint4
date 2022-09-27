import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import boardLogo from '../assets/img/board-logo.svg'

export const MainHeader = () => {

    const user = useSelector(state => state.userModule.user)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    return (
        <header className='full board-layout main-header'>
            <div className='flex header-main-container'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <img src={boardLogo} alt='logo' />
                        Rello
                    </Link>
                    <button className='btn btn-transparent btn-create' onClick={() => setIsUserModalOpen(true)}>
                        Create
                    </button>
                </div>
                {user
                    ? <button className='btn avatar-btn'>
                        <img src={user.imgUrl} alt='user avatar' className='avatar' />
                    </button>
                    : <div className='flex header-links'>
                        <Link to='/login' className='login-link'>Log in</Link>
                    </div>}
            </div>
        </header>
    )
}