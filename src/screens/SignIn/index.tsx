import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import Google from '../../assets/google.svg';
import Apple from '../../assets/apple.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { ButtonsWrapper, Container, Header, TitleWrapper, Title, SignInTitle, Footer, LogoWrapper } from './styles';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import theme from '../../global/styles/theme';
import { useTheme } from 'styled-components';

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple, user } = useAuth();


  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login, tente novamente.');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoWrapper>
            <Logo width={RFValue(120)} height={RFValue(120)} />
          </LogoWrapper>

          <Title>Controle suas{'\n'}finanças de forma{'\n'}muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com uma{'\n'}das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <ButtonsWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title='Logar com Google'
            svg={Google}
          />
          {Platform.OS === 'ios' &&
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title='Logar com Apple'
              svg={Apple}
            />
          }

        </ButtonsWrapper>
        {isLoading && <ActivityIndicator
          color={theme.colors.shape}
          style={
            { marginTop: 18 }
          }
        />}
      </Footer>

    </Container>
  )
}