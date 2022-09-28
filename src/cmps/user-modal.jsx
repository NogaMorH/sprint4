import { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { onLogout } from '../store/user/user.actions'

export const UserModal = ({ toggleUserModal }) => {

    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(onLogout())
    }

    if (!user) return <div></div>
    return (
        <div className='user-modal' onClick={(ev) => ev.stopPropagation()} >
            <header className='modal-title'>
                <span className='title'>Account</span>
                <button className='close-icon' onClick={toggleUserModal}><IoCloseOutline /></button>
            </header>
            <main>
                <div className='user-container'>
                    <img src={user.imgUrl} alt='user avatar' className='avatar' />
                    <div className='user-details'>
                        <div className='user-name'>{user.fullName}</div>
                        <div className='user-email'>{user.email}</div>
                    </div>
                </div>
                <ul className='btns-list'>
                    <li className='btn-action-container'>
                        <button className='btn btn-action' onClick={logout}>Log out</button>
                    </li>
                </ul>
            </main>
        </div>
    )
}