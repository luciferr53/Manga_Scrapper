import React from 'react'
import{createStackNavigator , createAppContainer} from 'react-navigation';
import Home from './Home'
import MainScreen from './MainScreen'
import Container from './Container'
const Navigator = createStackNavigator(
  {
  Home: {screen : Home},
  MainScreen : {screen: MainScreen},
  Container : {screen: Container}
},
{
    initialRouteName: 'Home'

});

export default Navigator;
