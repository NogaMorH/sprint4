import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../store/board/board.actions"
import { Checklist } from "./checklist"

export const ChecklistList = ({ checklists }) => {

    const { groupId, taskId } = useParams()
    const dispatch = useDispatch()

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