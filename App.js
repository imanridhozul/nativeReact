import React from 'react';
import { Image,StyleSheet, Button, View, Text, StatusBar } from 'react-native';
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
      <Header style={{ backgroundColor: 'white', height: 100 }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={{justifyContent:"center", alignItems:"center"}}>
         <Image source={require('./assets/logo.png')} style={{width: 150, height: 100}} />
         </View>
      </Header>
      <Content style={{ backgroundColor: '#1e272e' }}>
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
    screen: ViewAllUser,
    navigationOptions: {
      drawerLabel: 'Beranda',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  Catatan: {
    screen: DataRekap,
    navigationOptions: {
      drawerLabel: 'Catatan',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-copy" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  Maps: {
    screen: MapsAwal,
    navigationOptions: {
      drawerLabel: 'Maps',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-flag" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },
  Bulan: {
    screen: DataBulan,
    navigationOptions: {
      drawerLabel: 'Bulanan',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-calendar" style={{ fontSize: 25, color: tintColor }} />
      )
    }
  },


}, {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomContent,
    unmountInactiveRoutes:true,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      inactiveTintColor:"white",
      activeBackgroundColor: "black",    
      activeTintColor: '#FF9800',
      labelStyle: {
        color: "white"
      }
    }
  },

);


const AppContainer = createAppContainer(MyDrawerNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

