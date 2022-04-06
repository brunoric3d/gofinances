import React from 'react';
import { Container, Title, Icon } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

const icons = {
  income: 'arrow-up-circle',
  expense: 'arrow-down-circle',
}


interface Props extends RectButtonProps {
  isActive: boolean;
  title: string;
  type: 'income' | 'expense';
}

export function TransactionTypeButton({ isActive, title, type, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}
