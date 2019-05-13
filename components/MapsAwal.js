import React, { Component } from 'react';
import { Button,StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps'
import { Container, Content } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
class MapsAwal extends Component {
//-8.591614
//116.0876781
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      loc: "-6.270565,106.759550",
      markers: [],
      la: -8.591614,
      lo :116.0876781,
      on: false
    };
  }

  componentDidMount() {   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn("wokeeey");
        console.warn(position.coords.latitude);
        console.warn(position.coords.longitude);
        if(position.coords.latitude === this.state.la && position.coords.longitude === this.state.lo){
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            on: true
          });
        }
        else{
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
                       
          });
        }
        
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }
  onReg(target) {
    //console.warn(target.longitude, "target")
    var cord = {
      lat: target.latitude,
      long: target.longitude,
      title: "tesssss"
    };
    var tmp = this.state.markers.slice();
    tmp.push(cord)
    this.setState({
      markers: tmp
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ justifyContent: "space-between" }}>
            <MapView style={{ height: 350 }}
              initialRegion={{
                latitude: -8.593656,
                longitude: 116.104610,
                latitudeDelta: 1,
                longitudeDelta: 1,
              }}
              onPress={(e) => this.onReg(e.nativeEvent.coordinate)}
            >

              {this.state.markers.map(marker => (
                <MapView.Marker
                  coordinate={{ "latitude": marker.lat, "longitude": marker.long }}
                  title={marker.title}
                  description={"naah"}
                />
              ))
              }
              {
                this.state.on ?
                  <MapView.Marker
                    coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                    title={"Your Tempat"}
                    description={"naah"}
                  />
                  :
                  false
              }
            </MapView>
            {
              this.state.on ?
              <Button 
              title="absen"/>
              :
              false
            }

          </View>
        </Content>
      </Container>
    );
  }
}

export default MapsAwal;
