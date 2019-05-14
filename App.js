import React from 'react';
import { StyleSheet, Button, View, Text, StatusBar } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation'; // Version can be specified in package.json

import HelloStaff from './components/HelloStaff';
import { Icon, Container, Header, Content } from 'native-base';
import MapsAwal from './components/MapsAwal';
import ViewAllUser from './components/ViewAllUser';
import DataRekap from './components/DataRekap';
import DataBulan from './components/DataBulan';


const CustomContent = (props) => {
  return (
    <Container>
      {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
      <Header style={{ backgroundColor: '#2ecc71', height: 90 }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },

  buttonText: {
    padding: 20,
    color: 'black'
  }
});
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: DataRekap,
    navigationOptions: {
      drawerLabel: 'Beranda',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" />
      )
    }
  },
  Catatan: {
    screen: ViewAllUser,
    navigationOptions: {
      drawerLabel: 'Catatan',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" />
      )
    }
  },
  Maps: {
    screen: MapsAwal,
    navigationOptions: {
      drawerLabel: 'Maps',
      drawerIcon: ({ tintColor }) => (
        <Icon name="home" />
      )
    }
  },
  Bul: {
    screen: DataBulan,
    navigationOptions: {
      drawerLabel: ()=>null,      
    }
  },


}, {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomContent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });


const AppContainer = createAppContainer(MyDrawerNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

