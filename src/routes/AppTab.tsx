import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import Home from '../screens/HomeScreen';
import Client from '../screens/ClientScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const AppTab: React.FC = () => {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderColor: theme.backgroundItem,
          borderTopWidth: 2,
          paddingTop: 12,
        },
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Client" component={Client} />
    </Navigator>
  );
};

export default AppTab;
