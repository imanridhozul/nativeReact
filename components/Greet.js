import React, { Component } from 'react';
import { StyleSheet,View, Text } from 'react-native';

class Greet extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
      
  }

  render() {
    return (
      <View style={styles.gr}>
        <Text> Hai {this.props.nama} </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    gr:{
        flex:1,
        backgroundColor:'grey',
        margin : 4,
        borderColor: 'red',
        borderRadius: 6,
        height: 20

        
    }
});
export default Greet;
