import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import homeLogo from '../../assets/img/home-logo.svg'
import { UserModal } from '../user-modal'
// import { useRouteMatch } from "react-router-dom";

export const HomeHeader = () => {

    const user = useSelector(state => state.userModule.user)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    useEffect(() => {
        if (!user) closeUserModal()
    }, [user])

    const toggleUserModal = (ev) => {
        ev.stopPropagation()
        setIsUserModalOpen(!isUserModalOpen)
    }

    const closeUserModal = () => {
        setIsUserModalOpen(false)
    }

    return (
        <header className='flex home-header'>
            <Link to='/' className='logo'>
                <img src={homeLogo} alt='logo' />
                Rello
            </Link>
            {user
                ? <button className='btn avatar-btn' onClick={toggleUserModal}>
                    <img src={user.imgUrl} alt='user avatar' className='avatar' />
                </button>
                : <div className='flex header-links'>
                    <Link to='login' className='login-link'>Log in</Link>
                    <Link to='/template' className='btn btn-wide'>Get Rello for free</Link>
                </div>}
            {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} />}
        </header>
    )
}

