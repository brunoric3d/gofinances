import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface TypeProps {
  type: 'expense' | 'income'
}
interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled(RectButton) <ContainerProps>`
  flex: 2;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 5px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  align-items: center;
  padding: 18px;
  flex-direction: row;
  justify-content: center;

  ${({ isActive, type }) => !isActive && css`
  border: 1px solid ${({ theme }) => theme.colors.text};
  `};
  

  ${({ isActive, type }) => isActive && type === 'income' && css`
  background-color: ${({ theme }) => theme.colors.success_light};
  `};

  ${({ isActive, type }) => isActive && type === 'expense' && css`
  background-color: ${({ theme }) => theme.colors.attention_light};
  `};

`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.text_dark};
`;

export const Icon = styled(Feather) <TypeProps>`
font-size: ${RFValue(20)}px;
margin-right: 12px;
color: ${({ theme, type }) => type === 'income' ?
    theme.colors.success : theme.colors.attention
  };

`;