import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoLista from './todoLista'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: '',
            list: []
        }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.refresh()

        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    refresh(description='') {
        const search = description ? `&description__regex=/${description}/i` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data})) 
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
      this.setState({...this.state, description: e.target.value})
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, {description})
            .then(resp => this.refresh())
        
    }

    handleRemove(tarefas) {
        axios.delete(`${URL}/${tarefas._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(tarefas) {
        axios.put(`${URL}/${tarefas._id}`, {...tarefas, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(tarefas) {
        axios.put(`${URL}/${tarefas._id}`, {...tarefas, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleClear () {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <TodoForm 
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>

                <TodoLista
                    handleRemove={this.handleRemove}
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}