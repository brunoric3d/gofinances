import React from 'react';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ onPress, title, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Container onPress={onPress} {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>

  )
}
