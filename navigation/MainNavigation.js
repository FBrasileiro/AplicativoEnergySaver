import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'


const BottomNavigator = createBottomTabNavigator({
  Main:{
    screen:MainScreen,
    navigationOptions:{
      tabBarIcon: (tabInfo) => {
        return <Ionicons size={25} name="ios-home" />
      }
    }
  }
},
{
tabBarOptions:{
  activeTintColor: Colors.accent
}
},);


const MainNavigator = createStackNavigator({
    // Register:{
    //   navigationOptions: {
    //       headerShown: false,
    //     },
    //   screen:RegisterScreen,
    // },
    Login:{
        navigationOptions: {
            headerShown: false,
          },
        screen:LoginScreen,
    },
    Main: {
        navigationOptions: {
            headerShown: false,
          },
        screen: BottomNavigator,
    }
})


export default createAppContainer(MainNavigator);