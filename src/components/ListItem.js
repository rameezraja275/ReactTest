import React from 'react'

import styled from 'styled-components'

const ListItem = ({ title, onClick, status }) => (
  <Wrapper onClick={onClick}>
    <code>
      <Text status={status} >{`${title}`}</Text> {status ? '>' : ''}
    </code>
  </Wrapper>
)

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
  margin-block-end: unset;
`
const Text = styled.span`
  text-decoration: none;
`

export default ListItem
