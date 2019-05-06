import React from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Home from './components/Home'

import HelloStaff from './components/HelloStaff';
import { Icon } from 'native-base';

// const RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     Grid: {
//       screen: Grid,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

const BotBar = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      tabBarLabel:'LIST',
      tabBarIcon:({tinrColor})=>(
        <Icon name="md-menu"/>
      )
    }
  },
  Rekap: {
    screen: HelloStaff,
    navigationOptions:{
      tabBarLabel:'Rekapan',
      tabBarIcon:({tinrColor})=>(
        <Icon name="md-menu"/>
      )
    }
    
  }
})

const AppContainer = createAppContainer(BotBar);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}