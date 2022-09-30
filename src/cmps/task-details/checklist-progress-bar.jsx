import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        font-size: 11px;
        text-align: center;
        color: #5e6c84;
        padding-bottom: 5px;
    }

    progress[value] {
        -webkit-appearance: none;
        appearence: none;
        width: 93.946%;

        ::-webkit-progress-bar {
            height: 8px;
            border-radius: 4px;
            border: none;
            background-color: #091e4214;
        }

        ::-webkit-progress-value {
            height: 8px;
            background-color: ${props => props.color};
            transition-duration: 0.5s;
            border-radius: 20px;
        }
    }

    // only for Demo
    @media (max-width: 750px) {
        progress[value] {
            width: 310px;
        }
    }
`

export const ChecklistProgressBar = ({ checklist }) => {

    const value = checklist.todos.filter(todo => todo.isDone).length
    const max = checklist.todos.length
    let color = '#5ba4cf'
    if (value === max) color = '#61bd4f'

    return (
        <Container color={color}>
            {!max ?
                <div>{value}%</div>
                :
                <div>{Math.floor((value / max) * 100)}%</div>
            }
            <progress value={value} max={max} />
        </Container>
    )
}