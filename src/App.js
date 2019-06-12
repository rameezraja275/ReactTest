import React from 'react'
import { Provider, Subscribe } from 'unstated'
import styled from 'styled-components'
import TodosContainer from './store'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import AddList from './components/AddList'
import List from './components/List'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const todolist = todos.getTodos()
            const CurrentListId = todos.getCurrentlyOpenedlist()
            const mainlist = todos.getList()
            const constants = todos.getConstants()
            return (<BodyWrapper>
                      <List items={mainlist} toggleTodoList={todos.toggleTodoList} listid={CurrentListId}/>
                      <TodosWrapper>
                        <AddTodo onAddTodo={todos.createTodo} listid={CurrentListId}/>
                        <AddList onAddList={todos.createList}/>
                        <TodoListWrapper>
                          <TodoList items={todolist} listid={CurrentListId} toggleComplete={todos.toggleComplete} name={constants.ACTIVE}/>
                          <TodoList items={todolist} listid={CurrentListId} toggleComplete={todos.toggleComplete} name={constants.COMPLETED}/>
                        </TodoListWrapper>
                      </TodosWrapper>
                    </BodyWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;  
  font-size: 24px;
  color: white;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content : space-around;
  width :100%;
  margin-top :20px;
`
const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`
const TodoListWrapper = styled.div`
  display : flex;
  flex-direction: row;
`;
export default App
