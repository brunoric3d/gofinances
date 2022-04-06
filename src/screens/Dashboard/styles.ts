import { TransactionCardData } from './../../components/TransactionCard/index';
import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.colors.background}
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(35)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  flex: 1;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserBox = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Avatar = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`

export const GreetingBox = styled.View`
  margin-left: 17px;
`

export const Greeting = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`

export const UserName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`

export const PowerIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`

export const CardsSlider = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px; 
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px; 
  `


export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<TransactionCardData>) => FlatList<TransactionCardData>).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: 20
    }
  })``;

export const LogoutButton = styled(BorderlessButton)`
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;