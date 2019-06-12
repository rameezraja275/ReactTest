import React from 'react'
import styled from 'styled-components'
import ListItem from './ListItem'
import { tsPropertySignature } from '@babel/types';

const List = ({ items, toggleTodoList, listid}) => (
  <Wrapper>
    <TitleWrapper>List Of Task</TitleWrapper>
    { items.map(item => {
      let opened = false
      if(listid == item.id)
        opened = true
      const onClick = e => {
        toggleTodoList(item.id)
      }
       return <ListItem key={item.id} {...item} onClick={onClick} status={opened}/>
    })}
  </Wrapper>
)
const TitleWrapper = styled.h4`
  margin-top :0;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default List