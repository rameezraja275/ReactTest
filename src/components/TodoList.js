import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'
import { tsPropertySignature } from '@babel/types';



const TodoList = ({ items, listid,toggleComplete, name}) => (
  <Wrapper>
    <TitleWrapper>{name}</TitleWrapper>
    { 
      items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id, listid)
      }
      const list_jsx = <TodoItem key={item.id} {...item} onComplete={onComplete} />
      return name === "Active" ? (!item.completed ? list_jsx : null) : (item.completed ? list_jsx : null)
      })
    }
  </Wrapper>
)

const TitleWrapper = styled.h4`

`
const Wrapper = styled.div`
  margin-right: 80px;
  display: flex;
  flex-direction: column;
`

export default TodoList
