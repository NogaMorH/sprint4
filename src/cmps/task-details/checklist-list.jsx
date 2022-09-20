import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { updateTask } from "../../store/board/board.actions"
import { Checklist } from "./checklist"

export const ChecklistList = ({ checklists }) => {

    const [currChecklists, setChecklists] = useState(checklists)
    const dispatch = useDispatch()
    const params = useParams()
    const { groupId, taskId } = params

    useEffect(() => {
        dispatch(updateTask(groupId, taskId, 'checklists', currChecklists))
    }, [currChecklists])

    const updateChecklists = (checklist) => {
        setChecklists(prevChecklists => (
            prevChecklists.map(currChecklist => {
                if (currChecklist.id === checklist.id) {
                    return checklist
                }
                return currChecklist
            })
        ))
    }

    const removeChecklist = (checklistId) => {
        const updatedChecklists = currChecklists.filter(currChecklist => currChecklist.id !== checklistId)
        setChecklists(updatedChecklists)
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