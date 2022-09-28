import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import boardLogo from '../assets/img/board-logo.svg'
import { AddBoardModal } from "./template-page/add-board-modal"
import { UserModal } from "./user-modal"

export const MainHeader = () => {

    const user = useSelector(state => state.userModule.user)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const modalTaskId = useSelector(state => state.systemModule.modalTaskId)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false)

    useEffect(() => {
        if (isUserModalOpen) document.addEventListener('click', toggleUserModal)
        else document.removeEventListener('click', toggleUserModal)
    }, [isUserModalOpen])

    useEffect(() => {
        if (isAddBoardModalOpen) document.addEventListener('click', toggleAddBoardModal)
        else document.removeEventListener('click', toggleAddBoardModal)
    }, [isAddBoardModalOpen])

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

    const toggleAddBoardModal = (ev) => {
        ev.stopPropagation()
        setIsAddBoardModalOpen(!isAddBoardModalOpen)
    }

    return (
        <header className='full board-layout main-header'>
            <div className='flex header-main-container'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <img src={boardLogo} alt='logo' />
                        Rello
                    </Link>
                    <button className='btn btn-transparent btn-create' onClick={toggleAddBoardModal}>
                        Create
                    </button>
                    {isAddBoardModalOpen && <AddBoardModal toggleAddBoardModal={toggleAddBoardModal} />}
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
