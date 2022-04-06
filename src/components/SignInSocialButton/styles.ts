import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  height: ${RFValue(80)}px;
  border-radius: 5px;
  margin-bottom: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  text-align: center;
`;

export const LogoWrapper = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(20)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`