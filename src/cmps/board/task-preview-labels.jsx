import { useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { LabelStyleCmp } from "../dynamic-modal/label-style-cmp"

export const TaskPreviewLabels = ({ groupId, taskId }) => {

    const board = useSelector(state => state.boardModule.board)
    const labels = boardService.getTaskLabels(board, groupId, taskId)
    const [isLabelOpen, setIsLabelOpen] = useState(false)

    const toggleLabel = (ev) => {
        ev.stopPropagation()
        setIsLabelOpen(!isLabelOpen)
    }

    return (
        <div className="task-preview-labels">
            <ul className="labels-list">
                {labels.map(label => {
                    const { id, color, title } = label
                    return <li key={id}>
                        <LabelStyleCmp toggleLabel={toggleLabel}
                            inlineStyle={!isLabelOpen}
                            className={isLabelOpen ? 'label-open' : 'label-close'}
                            ballSize='ball-size' text='text' color={color} title={title}
                        />
                    </li>
                })}
            </ul>
        </div>
    )
}