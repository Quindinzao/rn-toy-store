// External libraries
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { styled, useTheme } from 'styled-components/native';
import { StatusBar, StatusBarStyle } from 'react-native';

// Routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

// Contexts
import { useAuth } from '../contexts/AuthContext';

const Routes: React.FC = () => {
  const themeBar = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading) {
    BootSplash.hide({ fade: true });
  }

  return (
    <StatusBarBackground>
      <StatusBar barStyle={themeBar.statusBarStyle as StatusBarStyle} />
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </StatusBarBackground>
  );
};

const StatusBarBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export default Routes;
