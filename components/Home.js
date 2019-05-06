
import React, { Component } from 'react';
import { Image, TouchableOpacity, ToastAndroid, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Footer, Header } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';




export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flexDirection:"row",backgroundColor: "#1e272e", margin: 3, borderRadius: 10 }}>
            <View style={{justifyContent:"center", alignItems:"center",margin:8,marginLeft:7,
            borderRadius:50, flex:1}}>
              <Text style={{fontSize:50,color:"white"}}>
                1
              </Text>
            </View>
            <View style={{flex:5}}>
              <Text style={{
                fontSize: 20, color: "white", marginTop: 5, marginLeft: 5,
                justifyContent: "center"
              }}>
                Ayammm Ayammm
              
              </Text>
              <View style={{ borderTopWidth: 5, borderTopColor: '#485460', flexDirection: "row", justifyContent: "space-between", margin: 5, marginLeft: 5 }}>
                <Text style={{ justifyContent: "center", fontSize: 20, color: "white" }}>
                  Harga : 23000
                </Text>
                <Text style={{
                  marginRight: 18, justifyContent: "center",
                  fontSize: 12, color: "white",
                  fontStyle: "italic",marginTop:5
                }}>
                  06/05/2019
                </Text>
              </View>
            </View>
          </View>
        </Content>

        <View style={{ justifyContent: "center", flexDirection: "row", backgroundColor: "#95a5a6", position: "absolute", bottom: 0, flex: 1, width: "100%" }}>
          <TextInput
            placeholder="pengeluaran"
            style={styles.inp}
          />
          <TextInput
            placeholder="Biaya"
            style={styles.inp}
          />
          <TouchableOpacity
            style={styles.butt}
          >
            <Text style={{ color: "#d2dae2" }}>add Data</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  butt: {
    marginLeft: 3,
    color: "#d2dae2",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#1e272e",
    borderBottomWidth: 4, borderBottomColor: "#808e9b",
    borderTopWidth: 4, borderTopColor: "#808e9b",
    flex: 1, borderRadius: 10
  },

  inp: {
    marginLeft: 3,
    color: "black",
    backgroundColor: "#d2dae2",
    borderBottomWidth: 4, borderBottomColor: "#808e9b",
    borderTopWidth: 4, borderTopColor: "#808e9b",
    flex: 1, borderRadius: 10
  },

});
