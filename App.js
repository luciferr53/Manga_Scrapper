import React,{Component} from 'react'
import {View,Header} from 'react-native'
import MainScreen from './src/components/MainScreen'
import Home from './src/components/Home'
import Navigator from './src/components/Navigator'
import {createAppContainer} from 'react-navigation'
console.disableYellowBox = true 
const AppContainer = createAppContainer(Navigator);


export default class App extends Component {

    render(){
    return(
      <AppContainer/>
    )
  }
}
