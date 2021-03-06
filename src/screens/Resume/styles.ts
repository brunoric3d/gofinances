import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`
  ;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
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

export const CategoriesList = styled(ScrollView)``

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 24px;

`;
export const MonthSelectButton = styled(BorderlessButton)`
  
`;
export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;