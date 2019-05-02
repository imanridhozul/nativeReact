
import React, { Component } from 'react';
import { Button,ScrollView, StyleSheet, Text, View } from 'react-native';
import Greet from './components/Greet';
import Axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      murid: [
        {
          nama: "iman",
          alamat: 'swadaya'
        },
        {
          nama: "faris",
          alamat: 'swasembada'
        }
      ],
      staff: []
    }
  }

 getStaff(){
  Axios.get("http://sampeweweh.dx.am/backend/index.php/tps/getStaff").then((response)=>{
    console.log(response.data)
    this.setState({
      staff:response.data
    })
  })
 }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcome}>halo ini----- aplikasi pertamaku semoga berhasil!!!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <View style={styles.gret}>
            {this.state.staff.map((murid) => {
              return <Greet key={murid.alamat} nama={murid.nama} />

            })}     
            <Button 
              onPress={this.getStaff.bind(this)}
              title="click"
            />
            <Text style={{fontSize:96}}>Scroll me plz</Text>
            <Greet nama="suwardiman" />
            <Greet nama="fathir AlQassam" />
            <Greet nama="suwadsdrdiman" />
   

          </View>

         
       



      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gret: {
    flex: 3,
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
