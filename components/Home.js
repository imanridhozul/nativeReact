
import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Footer, Header, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { db } from './config/ConfigDB'


const screenHeight = Math.round(Dimensions.get('window').height);
export default class Home extends Component {
  constructor(props) {
    super(props);
    const screenHeight = Math.round(Dimensions.get('window').height);
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + "/" + months[d.getMonth()] + "/" + d.getFullYear()
    this.state = {
      pengeluaran: "",
      biaya: "",
      curentPengeluaran: [],
      detik: [],
      edit: false,
      curentID: "",
      waktu: tgl
    }
  }
  componentDidMount() {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + ":" + months[d.getMonth()] + ":" + d.getFullYear()
    db.ref('/users/01/' + tgl).on('value', snapshot => {
      let keys = Object.keys(snapshot.val());
      let itemData = Object.values(snapshot.val());
      // console.warn(keys)
      this.setState({
        curentPengeluaran: itemData,
        detik: keys
      })
    });
  }
  gos = () => {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + ":" + months[d.getMonth()] + ":" + d.getFullYear()
    var detik = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    var pengeluaran = {
      p: this.state.pengeluaran,
      b: this.state.biaya
    };
    var updates = {};
    updates['/users/01/' + tgl + "/" + detik] = pengeluaran;
    db.ref().update(updates);
    this.setState({
      pengeluaran: "",
      biaya: ""
    })
  }
  deleteData = (idd) => {
    var id = this.state.detik[idd]
    console.warn(id)
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + ":" + months[d.getMonth()] + ":" + d.getFullYear()
    let userRef = db.ref('users/01/' + tgl + "/" + id);
    userRef.remove()
  }
  editData = (idd) => {
    var id = this.state.detik[idd]
    this.setState({
      edit: true,
      curentID: id
    })
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + ":" + months[d.getMonth()] + ":" + d.getFullYear()
    db.ref('/users/01/' + tgl + "/" + id).on('value', snapshot => {

      let itemData = Object.values(snapshot.val());
      //console.warn(itemData)
      this.setState({
        pengeluaran: itemData[1],
        biaya: itemData[0]
      })

    });
  }
  pushEdit = () => {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months[d.getMonth()];
    var tgl = d.getDate() + ":" + months[d.getMonth()] + ":" + d.getFullYear()
    console.warn(this.state.pengeluaran, this.state.biaya, this.state.curentID)
    // db.ref('/items/-Le7E7ZwRCXDewhXQF20').set({
    db.ref('/users/01/' + tgl + "/" + this.state.curentID).set({
      b: this.state.biaya,
      p: this.state.pengeluaran
    }).then((data) => {
      // console.warn('oiiiii')
    })
    this.setState({
      edit: false,
      pengeluaran: "",
      biaya: ""
    })    
  }


  render() {
    return (
      <Container>
        <View style={{backgroundColor: "#7f8fa6",flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
          <View style={{flexDirection: "row", justifyContent:"space-between",alignItems:"center",
           backgroundColor: "#485460", width: "100%",borderBottomWidth:2,borderBottomColor:"#1e272e"}}>

            <View style={{ justifyContent:"center",alignItems:"center",
              flexDirection: "row", marginLeft:15,}}>
              <Icon name="md-calendar" style={{ fontSize: 25,color:"white" }} />
              <Text style={{ marginLeft: 10, fontSize: 25,color:"white" }}>
                {this.state.waktu}
              </Text>
            </View>

            <Icon name="logo-freebsd-devil" style={{marginRight:30,fontSize: 25,color:"white"}} />

          </View>
          <Content>
            {
              this.state.curentPengeluaran.map((d, i) => {
                return (
                  <View key={i} style={{ flexDirection: "row", backgroundColor: "#1e272e", margin: 3, borderRadius: 10 }}>

                    <View style={{
                      justifyContent: "center", alignItems: "center", margin: 8, marginLeft: 7,
                      borderRadius: 40, flex: 1
                    }}>
                      <Text style={{ fontSize: 50, color: "white" }}>
                        {i + 1}
                      </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{
                          fontSize: 20, color: "white", marginTop: 5,
                          justifyContent: "center", flex: 4,
                        }}>
                          {d.p}
                        </Text>
                        <View style={{
                          borderLeftColor: "#d2dae2", justifyContent: "space-between", alignItems: "center",
                          borderLeftWidth: 2, flexDirection: "row", flex: 1, marginRight: 10
                        }}>
                          <TouchableOpacity
                            onPress={() => this.editData(i)}
                            style={{ justifyContent: "center", alignItems: "center", marginLeft: 3 }}>
                            <Icon name="md-create" style={{ color: "#f0932b" }} />

                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => this.deleteData(i)}
                            style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name="trash" style={{ color: "#e55039" }} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{
                        borderTopWidth: 5, borderTopColor: '#d2dae2', flexDirection: "row",
                        justifyContent: "space-between", alignItems: "center"
                      }}>
                        <Text style={{
                          justifyContent: "center",
                          fontSize: 15, color: "white"
                        }}>
                          Harga : {d.b}
                        </Text>
                        <Text style={{
                          marginRight: 20, justifyContent: "center",
                          fontSize: 12, color: "white",
                          fontStyle: "italic"
                        }}>
                          {this.state.detik[i]}
                        </Text>
                      </View>
                    </View>

                  </View>

                )

              })
            }

          </Content>

          <View style={{
            justifyContent: "center", flexDirection: "row",
            backgroundColor: "#353b48", width: "100%"
          }}>
            <TextInput
              placeholder="pengeluaran"
              style={styles.inp}
              value={this.state.pengeluaran}
              onChangeText={(text) => this.setState({ pengeluaran: text })}
            />
            <TextInput
              placeholder="Biaya"
              value={this.state.biaya}
              style={styles.inp}
              onChangeText={(text) => this.setState({ biaya: text })}
            />
            {
              this.state.edit ?
                <TouchableOpacity
                  style={[styles.butt, { backgroundColor: "#3742fa" }]}
                  onPress={this.pushEdit}>
                  <Text style={{ color: "white" }}>Edit Data</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.butt}
                  onPress={this.gos}>
                  <Icon name="md-shuffle"/>
                  <Text style={{ color: "black", marginLeft:5 }}>add Data</Text>
                </TouchableOpacity>
            }

          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  butt: {
    marginLeft: 3,
    color: "#2f3640",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#6ab04c",
    flexDirection:"row",
    borderBottomWidth: 4, borderBottomColor: "#353b48",
    borderTopWidth: 4, borderTopColor: "#353b48",
    flex: 1, borderRadius: 10
  },

  inp: {
    marginLeft: 3,
    color: "black",
    backgroundColor: "#d2dae2",
    borderBottomWidth: 4, borderBottomColor: "#353b48",
    borderTopWidth: 4, borderTopColor: "#353b48",
    flex: 1, borderRadius: 10
  },

});
