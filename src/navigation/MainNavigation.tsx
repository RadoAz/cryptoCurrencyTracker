import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import CryptoDetailsScreen from '../screens/CryptoDetailsScreen/CryptoDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import {RootStackParamList} from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const DashboardStack: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    <Stack.Screen name="Details" component={CryptoDetailsScreen} />
  </Stack.Navigator>
);

const MainNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
