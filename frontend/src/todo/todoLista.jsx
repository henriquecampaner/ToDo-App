import React from 'react'
import todoForm from './todoForm'
import IconButto from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(tarefas =>
             <tr key={tarefas._id}>
                 <td className={tarefas.done ? 'markedAsDone' : ''}>{tarefas.description}</td>
                <td>
                    <IconButto style='success' icon='check' hide={tarefas.done} onClick={() => props.handleMarkAsDone(tarefas)} />
                    <IconButto style='warning' icon='undo' hide={!tarefas.done} onClick={() => props.handleMarkAsPending(tarefas)} />
                    <IconButto style='danger' icon='trash-o' hide={!tarefas.done} onClick={() => props.handleRemove(tarefas)}/>
                </td>
             </tr>)
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descricao</th>
                    <th className="tableActions">Acoes</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}