import React from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Home from './components/Home'

import HelloStaff from './components/HelloStaff';
import { Icon } from 'native-base';
import MapsAwal from './components/MapsAwal';

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
      tabBarIcon:({tintColor})=>(
        <Icon name="md-jet"/>
      )
    }
  },
  Rekap: {
    screen: HelloStaff,
    navigationOptions:{
      tabBarLabel:'Rekapan',
      tabBarIcon:({tintColor})=>(
        <Icon name="md-search"/>
      )
    }    
  },
  Awal: {
    screen: MapsAwal,
    navigationOptions:{
      tabBarLabel:'Maps',
      tabBarIcon:({tintColor})=>(
        <Icon name="md-search"/>
      )
    }    
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#353b48',
    },
  }
}

)

const AppContainer = createAppContainer(BotBar);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}