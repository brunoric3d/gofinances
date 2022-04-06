import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;