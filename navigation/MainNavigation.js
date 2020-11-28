import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Colors from '../constants/Colors'
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'
import SyncScreen from '../screens/SyncScreen'
import ProfileScreen from '../screens/ProfileScreen'

const BottomNavigator = createBottomTabNavigator({
  Sync:{
    screen:SyncScreen,
    navigationOptions:{
      tabBarLabel:"Aparelhos",
      tabBarIcon: (tabInfo) => {
        return <MaterialCommunityIcons size={25} name="bluetooth-connect" />
      }
    }
  },
  Main:{
    screen:MainScreen,
    navigationOptions:{
      tabBarLabel:"Home",
      tabBarIcon: (tabInfo) => {
        return <Ionicons size={25} name="md-home" />
      }
    }
  },
  Profile:{
    screen:MainScreen,
    navigationOptions:{
      tabBarLabel:"Perfil",
      tabBarIcon: (tabInfo) => {
        return <MaterialIcons size={25} name="person" />
      }
    }
  }
},
{
  initialRouteName:"Main",
  tabBarOptions:{
    activeTintColor: Colors.accent
  }
},);

BottomNavigator

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