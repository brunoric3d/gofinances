import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 24px;
`


export const Header = styled.View``;
export const Title = styled.Text``;
export const Icon = styled(Feather)``;
export const Content = styled.View``;
export const Amount = styled.Text``;
export const LatestTransaction = styled.Text``;