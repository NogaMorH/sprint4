import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import boardLogo from '../assets/img/board-logo.svg'
import { UserModal } from "./user-modal"

export const MainHeader = () => {

    const user = useSelector(state => state.userModule.user)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    useEffect(() => {
        if (isUserModalOpen) document.addEventListener('click', toggleUserModal)
        else document.removeEventListener('click', toggleUserModal)
    }, [isUserModalOpen])

    useEffect(() => {
        if (!user) closeUserModal()
    }, [user])

    useEffect(() => {
        if (modalGroupId || modalTaskId) closeUserModal()
    }, [modalGroupId, modalTaskId])

    const toggleUserModal = (ev) => {
        ev.stopPropagation()
        setIsUserModalOpen(!isUserModalOpen)
    }

    const closeUserModal = () => {
        setIsUserModalOpen(false)
    }

    return (
        <header className='full board-layout main-header'>
            <div className='flex header-main-container'>
                <div className='logo-container'>
                    <Link to='/template' className='logo'>
                        <img src={boardLogo} alt='logo' />
                        Rello
                    </Link>
                    <button className='btn btn-transparent btn-create'>
                        Create
                    </button>
                </div>
                {user
                    ? <button className='btn avatar-btn' onClick={toggleUserModal}>
                        <img src={user.imgUrl} alt='user avatar' className='avatar' />
                    </button>
                    : <div className='flex header-links'>
                        <Link to='/login' className='login-link'>Log in</Link>
                    </div>}
                {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} />}
            </div>
        </header>
    )
}
