import styled from "styled-components/native";
import {FlatList} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { DataListProps } from ".";


export const Container = styled.View`
flex: 1;
background-color: ${({theme}) => theme.colors.background};
margin-bottom: 16px;
`;

export const Header = styled.View`
background-color: ${({theme}) => theme.colors.primary};
width: 100%;
height: ${RFPercentage(42)}px;
flex-direction: row;
justify-content: center;
align-items: flex-start;
`;

export const UserWrapper = styled.View`
width: 100%;
padding: 0 24px;
margin-top: ${getStatusBarHeight() + RFValue(28)}px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const UserInfo = styled.View`
flex-direction: row;
align-items: center;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Photo = styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;
border-radius: 10px;
`;

export const User = styled.View`
margin-left: 17px;
`;

export const UserWelcone = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.bold};
`;

export const Icone = styled(Feather)`
color: ${({theme}) => theme.colors.secondary};
font-size: ${RFValue(24)}px;
`;

export const CardsWrappper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 24},
})`
width: 100%;
position: absolute;
margin-top: ${RFPercentage(20)}px;
`;

export const Transantions = styled.View`
flex: 1;
padding: 0 24px;
margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular};
margin-bottom: 16px;
`;

export const TransactionsList = styled(FlatList as new () =>  FlatList<DataListProps>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: getBottomSpace()}
})``;