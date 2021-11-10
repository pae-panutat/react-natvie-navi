import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdduserScreen from './screens/AdduserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen'

const Stack = createStackNavigator();

const MyStack = () => {
  return ( 
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e78',
          height: 110
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
      >
        
        <Stack.Screen name="AdduserScreen" component={AdduserScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
       
      </Stack.Navigator>   
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
   </NavigationContainer>
  );
}

