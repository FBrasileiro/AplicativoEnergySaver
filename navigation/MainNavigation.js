import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'


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
        screen: MainScreen,
    }
})


export default createAppContainer(MainNavigator);