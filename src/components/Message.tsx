import * as React from 'react'
import styled from 'styled-components'
import { Container, Row } from 'react-rasta'
import MessageAuthor, { MessageAuthorData } from './MessageAuthor'

const Wrapper = styled(Container)`
`

interface Props {
  content: string
  author: MessageAuthorData
}

const Message: React.SFC<Props> = ({ content, author }) => (
  <Wrapper>
    <Row><MessageAuthor author={author} />{content}</Row>
  </Wrapper>
)

export default Message

