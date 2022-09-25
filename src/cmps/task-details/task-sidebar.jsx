import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setDynamicModal } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const TaskSideBar = () => {

    const dynamicModal = useSelector(state => state.systemModule.dynamicModal)
    const types = ['members', 'labels', 'checklist', 'dates', 'attachment', 'cover']
    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const openModal = (modalType) => {
        if (dynamicModal.modalType === modalType) {
            return closeModal()
        }
        dispatch(setDynamicModal({ modalType, fromCmp: 'sidebar' }))
    }

    const closeModal = () => {
        dispatch(setDynamicModal({ modalType: null, fromCmp: null }))
    }

    return (
        <div className="task-sidebar">
            {types.map((type, idx) => {
                return (
                    <div key={idx}>
                        <button className="task-sidebar-btn" onClick={() => openModal(type)}>{type}</button>
                        {dynamicModal.modalType === type && dynamicModal.fromCmp === 'sidebar' &&
                            <DynamicModal type={type} groupId={groupId} taskId={taskId} closeModal={closeModal} />
                        }
                    </div>
                )
            })}
            <button>Archive</button>
        </div>
    )
}