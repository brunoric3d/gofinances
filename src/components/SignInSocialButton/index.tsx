import React from 'react';
import { Container, Title, LogoWrapper } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

export function SignInSocialButton({ onPress, title, svg: Svg, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Container onPress={onPress} {...rest}>
        <LogoWrapper>
          <Svg />
        </LogoWrapper>

        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>

  )
}
