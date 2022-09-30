import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from "../../store/board/board.actions"
import { Checklist } from "./checklist"

export const ChecklistList = ({ checklists }) => {

    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    const updateChecklists = (checklist) => {
        const updatedChecklists = checklists.map(currChecklist => {
            if (currChecklist.id === checklist.id) {
                return checklist
            }
            return currChecklist
        })

        dispatch(updateTask(groupId, taskId, 'checklists', updatedChecklists))
    }

    const removeChecklist = (checklistId) => {
        const updatedChecklists = checklists.filter(currChecklist => currChecklist.id !== checklistId)
        dispatch(updateTask(groupId, taskId, 'checklists', updatedChecklists))
    }

    return (
        <div className="checklist-list">

            {checklists.map(checklist => (
                <Checklist key={checklist.id}
                    checklist={checklist}
                    updateChecklists={updateChecklists}
                    removeChecklist={removeChecklist}
                />
            ))}
        </div>
    )
}