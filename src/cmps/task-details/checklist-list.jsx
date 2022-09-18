import { useEffect, useState } from "react"
import { Checklist } from "./checklist"

export const ChecklistList = ({ checklists, updateTask }) => {

    const [currChecklists, setChecklists] = useState(checklists)

    useEffect(() => {
        updateTask('checklists', currChecklists)
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