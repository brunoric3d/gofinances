import React from 'react';

import { Container, Header, Title, Icon, Content, Amount, LatestTransaction } from './styles'

export function HightlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>
      <Content>
        <Amount>R$ 15.000,00</Amount>
        <LatestTransaction>Última entrada dia 13 de abril</LatestTransaction>
      </Content>
    </Container>
  )
}