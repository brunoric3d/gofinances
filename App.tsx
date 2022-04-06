import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const { userStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded || userStorageLoading) { return <AppLoading /> }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <StatusBar style="light" />
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>



  );
}

