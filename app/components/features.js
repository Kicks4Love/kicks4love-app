import React, { Component } from 'react';
import { Text, View } from 'react-native';

const styles = require('../styles/features.styles');

export default class Index extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <Text>Features!</Text>
      </View>
    );
  }
}