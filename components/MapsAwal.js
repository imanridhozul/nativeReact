import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps'
import { Container, Content } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
class MapsAwal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn("wokeeey");
        console.warn(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }


  render() {
    return (
      <Container>
        <Content>
          <View style={{justifyContent:"space-between"}}>
          {/* <GooglePlacesAutocomplete
    placeholder='Enter Location'
    minLength={2}
    autoFocus={false}
    fetchDetails
    listViewDisplayed='auto'
    query={{
         key: 'AIzaSyBIM6nu1s_-HNEzKmQfRjbEBhqavUsYjIc',
         language: 'en',
         types: 'geocode',
         -8.593656
         116.104610
    }}
    currentLocation={false} /> */}
            <MapView style={{height:350}} initialRegion={{
              latitude: -6.270565,
              longitude: 106.759550,
              latitudeDelta: 1,
              longitudeDelta: 1
            }}>

              {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                title={"Your Location"}
              />}

            </MapView>
          
          </View>
        </Content>      
      </Container>
    );
  }
}

export default MapsAwal;
