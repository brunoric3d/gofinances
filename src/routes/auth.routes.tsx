import React from 'react';
import { useTheme } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  const theme = useTheme();
  return (

    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>

  )
}