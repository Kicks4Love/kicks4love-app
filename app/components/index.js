import React, { Component } from 'react';
import { Text, View } from 'react-native';

const indexStyles = require('../styles/index.styles');

export default class Index extends Component {  
  render() {
    return (
      <View style={indexStyles.container}>
        <Text>Welcome to Kicks4Love Mobile App!</Text>
      </View>
    );
  }
}