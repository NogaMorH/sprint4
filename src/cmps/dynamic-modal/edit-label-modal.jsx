import { useEffect, useRef, useState } from 'react'
import { ColorPickerStyleCmp, LabelStyleCmp } from './label-style-cmp'
import { IoCloseOutline } from 'react-icons/io5'

export const EditLabelModal = ({ label, updateLabels, toggleModal }) => {

    const { id, color, title } = label
    const [updatedColor, setUpdatedColor] = useState(color)
    const [name, setName] = useState(title)
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const onChange = ({ target }) => {
        setName(target.value)
    }

    const removeColor = () => {
        setUpdatedColor('#DFE1E6')
    }

    const changeColor = (color) => {
        setUpdatedColor(color)
    }

    const updateLabel = () => {
        label.color = updatedColor
        label.title = name
        updateLabels(label)
    }

    return (
        <div className="edit-label-modal">

            <div className="label-container">
                <LabelStyleCmp className="label-edit" color={updatedColor} title={name} />
            </div>

            <div className="dynamic-content">
                <h6>Title</h6>
                <input className="dynamic-input" type="text" ref={ref} value={name} onChange={onChange} />

                <h6>Select a color</h6>
                <ul className="color-palette">

                    {colorPalette.map((color, idx) => {
                        return (
                            <li key={idx} onClick={() => changeColor(color)}>
                                <ColorPickerStyleCmp color={color} />
                            </li>
                        )
                    })}
                </ul>

                <div className={`remove-btn ${updatedColor === '#DFE1E6' && 'disable'}`}>
                    <IoCloseOutline className="icon-close"/>
                    <button onClick={removeColor}>Remove color</button>
                </div>

                <div className="buttons">
                    <button className={`edit-save-btn ${!id && 'c-btn'}`} onClick={updateLabel}>
                        {id ? 'Save' : 'Create'}
                    </button>

                    {id &&
                        <button className="edit-delete-btn" onClick={() => toggleModal('delete', label)}>
                            Delete
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

const colorPalette = [
    '#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB', '#7BC86C', '#F5DD29', '#FFAF3F',
    '#EF7564', '#CD8DE5', '#5AAC44', '#E6C60D', '#E79217', '#CF513D', '#A86CC1', '#8BBDD9',
    '#8FDFEB', '#B3F1D0', '#F9C2E4', '#505F79', '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4',
    '#344563', '#026AA7', '#00AECC', '#4ED583', '#E568AF', '#091E42'
]