import React from 'react';
import { HightlightCard } from '../../components/HighlightCard';


import { Avatar, Container, Greeting, GreetingBox, Header, UserWrapper, PowerIcon, UserBox, UserName } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserBox>
            <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/2111574?v=4.png' }} />
            <GreetingBox>
              <Greeting>Olá,</Greeting>
              <UserName>Bruno</UserName>
            </GreetingBox>
          </UserBox>
          <PowerIcon name="power" />
        </UserWrapper>
      </Header>
      <HightlightCard />
    </Container>
  );
}
