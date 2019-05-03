
import React, { Component } from 'react';
import { Image, StatusBar, ToastAndroid, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Greet from './components/Greet';
import Axios from 'axios';
import Home from './components/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <ScrollView>
        <StatusBar animated backgroundColor="black" barStyle="light-content" />
        <Home />
        
      
      </ScrollView>
    );
  }
}