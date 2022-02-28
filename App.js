/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {  StyleSheet,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Fontawesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDo from './src/screens/ToDo';
import Done from './src/screens/Done';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import Task from './src/screens/Task';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0080ff',
        inactiveTintColor: '#777777',
        labelStyle: {
          fontSize: 15,
          fontWeight: 'bold'
        }
      }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconname;
          if (route.name === 'To-Do') {
            iconname = 'clipboard-list';
            size = focused ? 25 : 20;
            color = focused ? '#f0f' : '#555';
          }
          else if (route.name === 'Done') {
            iconname = 'clipboard-check';
            size = focused ? 25 : 20;
            color = focused ? '#f0f' : '#555';
          }
          return <Fontawesome5 color={color} size={size} name={iconname} />
        },
        headerShown: false
      })}

    >
      <Tab.Screen name={'To-Do'} component={ToDo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  )
}


const App = () => {
  const dispatch = useDispatch();



  const getTODOS = () => {
    dispatch({ type: 'GET_TODOS' })
  }
  useEffect(() => {
    getTODOS();
    console.log(todos)
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator

        screenOptions={{
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: 'white'
        }}
        initialRouteName='My Tasks'

      >


        
        <Stack.Screen
          name='My tasks' component={Home} />
        <Stack.Screen
          name='Task' component={Task} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
