import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CategoryProps {
  isActive: boolean;
};

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`
  ;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width:100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  flex-direction: row;
  width: 100%;
  padding: ${RFValue(16)}px;
  align-items: center;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(8)}px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`


export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`


