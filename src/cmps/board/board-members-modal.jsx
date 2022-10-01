import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'

export const BoardMembersModal = ({ setIsMembersModalOpen }) => {

    const board = useSelector(state => state.boardModule.board)

    const { members } = board
    console.log('members[0].fullName:', members[0].username)

    return (
        <div className='black-screen' onClick={() => setIsMembersModalOpen(false)}>
            <div className='board-members-modal' onClick={ev => ev.stopPropagation()}>
                <div className='flex modal-title-container'>
                    <h3 className='modal-title'>Share board</h3>
                    <button><IoCloseOutline /></button>
                </div>
                <form className='flex search-member'>
                    <input type='text' placeholder='Email address or name' className='member-input' />
                    <button>Share</button>
                </form>
                {members && (
                    <ul className='members-list'>
                        {members.map(member => (
                            <li className='member' key={member.id}>
                                <img src={member.imgUrl} alt='Member avatar' className='member-avatar' />
                                <div className='member-details'>
                                    <div>{member.fullName}</div>
                                    <div>@{member.username}</div>
                                </div>
                            </li>))}
                    </ul>)}
            </div>
        </div>
    )
}