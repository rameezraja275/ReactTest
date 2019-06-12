import { Container } from 'unstated'

const defaultState = {
  constants : {
    ACTIVE : "Active",
    COMPLETED : "Complete"
  },

  currentOpenlistId : 1,
  list: [
    {
      id : 1,
      title : 'Read README',
      todos : [
        {
          id: 1,
          completed: true,
          text: 'Read'
        },
        {
          id: 2,
          completed: false,
          text: 'Understand'
        }
      ]
    },
    {
      id : 2,
      title : 'Codeing',
      todos : [
        {
          id: 1,
          completed: true,
          text: 'Create project'
        },
        {
          id: 2,
          completed: false,
          text: 'Install Packages'
        }
      ]
    }
  ]
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }
    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList(id) {
    
    return this.state.list
  }

  getTodos()
  {
    const id = this.state.currentOpenlistId
    const item = this.state.list.find(i => i.id === id)
    return item.todos
  }
  getCurrentlyOpenedlist()
  {
    return this.state.currentOpenlistId
  }

  getConstants () {
    return defaultState.constants
  }

  toggleComplete = async (id, listId) => {
    const SelectedlistItem = this.state.list.find(i => i.id === listId )
    const todoItem = SelectedlistItem.todos.find(i => i.id === id)
    const completed = !todoItem.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated

    await this.setState(state => {
        const list = state.list.map(item => {
          if (item.id !== listId) return item
          else
          {
            let todoItem = item.todos.map(item=>{
              if (item.id !== id) return item
              return {
                ...item,
                completed,
              }
            }) 
            return {
              todos : todoItem,
              title : item.title,
              id : item.id
            }
          }   
      })
      return { list }
    })

    this.syncStorage()
  }

  toggleTodoList = async id =>{
    // const item = this.state.list.find(i => i.id === id)
    await this.setState(state => {
      return { currentOpenlistId : id }
    })
  
  }

  createTodo = async (text, listId) => {

    let listItem = this.state.list.find(i => i.id === listId)
    let list = this.state.list
    const todo = listItem.todos
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: todo.length + 1
      }
      const todos = todo.concat(item) 
      list = list.map((item, index)=>{
        if(item.id === listId)
        {
          item = { ...listItem, todos }
        }
   
        return item
      })
      return { list }
    })
    this.syncStorage()
  }

  createList = async title => {
    await this.setState( state => {
      const item = {
        title,
        id : state.list.length + 1,
        todos : []
      }
      const list = state.list.concat(item)
      return { list }
    })
    this.syncStorage()
  }
 
}

export default TodosContainer
