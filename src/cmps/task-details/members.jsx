import { BsPlusLg } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const Members = ({ members }) => {

    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const params = useParams()
    const { groupId, taskId } = params
    const dispatch = useDispatch()

    const toggleModal = () => {
        if (dynamicModal.modalType === 'members') {
            return dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
        }
        dispatch(setDynamicModal({ modalType: 'members', fromCmp: 'members' }))
    }

    return (
        <div className="members-container">
            <h6>Members</h6>

            <div className="members-div">
                {members.map(member => (
                    <img key={member.id} src={member.imgUrl} alt="profile img" />
                ))}

                <button className="icon-add" onClick={toggleModal}><BsPlusLg /></button>
            </div>

            {dynamicModal.modalType === 'members' && dynamicModal.fromCmp === 'members' &&
                <DynamicModal type='members' groupId={groupId} taskId={taskId} closeModal={toggleModal} />
            }
        </div>
    )
}