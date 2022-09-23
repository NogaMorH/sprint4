import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setDynamicModalType } from "../../store/board/board.actions"
import { DynamicModal } from "../dynamic-modal/dynamic-modal"

export const TaskSideBar = () => {

    const dynamicModalType = useSelector(state => state.systemModule.dynamicModalType)
    const types = ['members', 'labels', 'checklist', 'dates', 'attachment']
    // const types = ['members', 'labels', 'checklist', 'dates', 'attachment', 'cover']
    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const openModal = (type) => {
        if (dynamicModalType === type) {
            return closeModal()
        }
        dispatch(setDynamicModalType(type))
    }

    const closeModal = () => {
        dispatch(setDynamicModalType(null))
    }

    return (
        <div className="task-sidebar">
            {types.map((type, idx) => {
                return (
                    <div key={idx}>
                        <button className="task-sidebar-btn" onClick={() => openModal(type)}>{type}</button>
                        {dynamicModalType === type &&
                            <DynamicModal type={type} groupId={groupId} taskId={taskId} closeModal={closeModal} />}
                    </div>
                )
            })}
            <button>Archive</button>
        </div>
    )
}