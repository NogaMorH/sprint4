import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { useForm } from '../../hooks/useForm'
import { userService } from '../../services/user.service'
import { useState } from 'react'
import { useEffect } from 'react'

export const BoardMembersModal = ({ setIsMembersModalOpen }) => {

    const board = useSelector(state => state.boardModule.board)
    const [users, setUsers] = useState([])
    const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)

    const onFilterUsers = async (form) => {
        const filteredUsers = await userService.filterUsers(form)
        setUsers(filteredUsers)
        if (users && users.length) setIsUsersModalOpen(true)
        else setIsUsersModalOpen(false)
    }

    const [form, handleChange] = useForm({ text: '' }, onFilterUsers)

    const { members } = board

    return (
        <div className='black-screen' onClick={() => setIsMembersModalOpen(false)}>
            <div className='board-members-modal' onClick={ev => ev.stopPropagation()}>
                <div className='flex modal-title-container'>
                    <h3 className='modal-title'>Share board</h3>
                    <button className='close-icon' onClick={() => setIsMembersModalOpen(false)}>
                        <IoCloseOutline />
                    </button>
                </div>
                <form className='flex search-member'>
                    <div className='input-container'>
                        <input type='text' placeholder='Search by name' className='member-input' name='text'
                            onChange={handleChange} value={form.text} />
                        {isUsersModalOpen &&
                            <ul className='suggested-user-list'>
                                {users.map(user => (
                                    <li className='flex suggested-user'>
                                        <button className='btn add-member-btn'>
                                            <img src={user.imgUrl} alt='avatar' className='member-avatar' />
                                            <span className='suggested-user-name'>{user.fullName}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>}
                    </div>
                    <button className='btn btn-primary-board'>Share</button>
                </form>
                {members && (
                    <ul className='members-list'>
                        {members.map(member => (
                            <li className='flex member' key={member.id}>
                                <img src={member.imgUrl} alt='Member avatar' className='member-avatar' />
                                <div className='member-details'>
                                    <div className='full-name'>{member.fullName}</div>
                                    <div className='username'>@{member.username}</div>
                                </div>
                            </li>))}
                    </ul>)}
            </div>
        </div>
    )
}