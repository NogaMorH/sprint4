import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"
import { useMediaQuery } from "@mui/material"
import { BsPlusLg } from "react-icons/bs"

export const Members = ({ members, dynamicModal }) => {

    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()
    const matches = useMediaQuery('(max-width: 750px)')

    const toggleModal = () => {
        if (dynamicModal.modalType === 'members') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }

        dispatch(setDynamicModal({ modalType: 'members', fromCmp: 'members' }))
    }

    return (
        <div className="members-container">
            <h6>Members</h6>

            <div className="members">
                {members.map(member => (
                    <img key={member._id} src={member.imgUrl} alt="profile img" />
                ))}

                <button className="icon-add" onClick={toggleModal}><BsPlusLg /></button>
            </div>

            {dynamicModal.modalType === 'members' && dynamicModal.fromCmp === 'members' &&
                <>
                    <DynamicModal type='members' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
                    {matches && <div className="black-screen" />}
                </>
            }
        </div>
    )
}