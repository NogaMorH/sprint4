import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { useForm } from '../../hooks/useForm'
import { userService } from '../../services/user.service'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMembersToBoard } from '../../store/board/board.actions'

export const BoardMembersModal = ({ setIsMembersModalOpen }) => {

    const board = useSelector(state => state.boardModule.board)
    const { members } = board
    const [users, setUsers] = useState([])
    const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const dispatch = useDispatch()

    const onFilterUsers = async (form) => {
        const filteredUsers = await userService.filterUsers(form)
        setUsers(filteredUsers)
        if (form.text) setIsUsersModalOpen(true)
    }

    const [form, handleChange, setFields] = useForm({ text: '' }, onFilterUsers)

    useEffect(() => {
        setUsers([])
        setIsUsersModalOpen(false)

        return () => {
            setSelectedUsers([])
        }
    }, [])

    const closeUsersModal = (ev) => {
        ev.stopPropagation()
        setIsUsersModalOpen(false)
    }

    const onSelectUser = (user) => {
        setSelectedUsers(prevState => [...prevState, user])
        setFields({ text: '' })
    }

    const removeUser = (userId) => {
        const updatedUsers = selectedUsers.filter(selectedUser => selectedUser._id !== userId)
        setSelectedUsers(updatedUsers)
    }

    const onShare = (ev) => {
        ev.preventDefault()
        dispatch(addMembersToBoard(selectedUsers))
    }

    const isBoardMember = (suggestedUser) => {
        return board.members.find(member => member._id === suggestedUser._id)
        // return boardMember ? true : false
    }

    return (
        <div className='black-screen' onClick={() => setIsMembersModalOpen(false)}>
            <div className='board-members-modal' onClick={closeUsersModal}>
                <div className='flex modal-title-container'>
                    <h3 className='modal-title'>Share board</h3>
                    <button className='close-icon' onClick={() => setIsMembersModalOpen(false)}>
                        <IoCloseOutline />
                    </button>
                </div>
                <form className='flex search-member-container'>
                    <div className='search-member'>
                        <div className='input-container'>
                            {selectedUsers && (
                                <div className='selected-users'>
                                    {selectedUsers.map(selectedUser => (
                                        <div className='selected-user' key={selectedUser._id}>
                                            <span className='selected-user-name'>
                                                {selectedUser.fullName}
                                            </span>
                                            <button className='btn btn-remove-user'
                                                onClick={() => removeUser(selectedUser._id)}>
                                                <IoCloseOutline />
                                            </button>
                                        </div>
                                    ))}
                                </div>)}
                            <input type='text' placeholder={selectedUsers?.length ? '' : 'Search by name'}
                                className='member-input' name='text'
                                onChange={handleChange} value={form.text} />
                        </div>
                        {isUsersModalOpen &&
                            <div className='user-list-container'>
                                {users.length
                                    ? <ul className='suggested-user-list'>
                                        {users.map(user => (
                                            <li className='flex suggested-user' key={user._id}>
                                                <button
                                                    className={`btn add-member-btn ${isBoardMember(user) && 'disabled'}`}
                                                    disabled={isBoardMember(user)}
                                                    onClick={() => onSelectUser(user)}>
                                                    <img src={user.imgUrl} alt='avatar' className='member-avatar' />
                                                    <span className='suggested-user-name'>{user.fullName}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    : <div className='msg'>Looks like that person isn't a Trello member yet.</div>}
                            </div>}
                    </div>
                    <button className='btn btn-primary-board' type='submit' onClick={ev => onShare(ev)}>
                        Share
                    </button>
                </form>
                {members && (
                    <ul className='members-list'>
                        {members.map(member => (
                            <li className='flex member' key={member._id}>
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