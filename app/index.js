import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

var styles = require('./index.styles');

class Index extends Component {
  static navigationOptions = { title: 'Latest News' };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const Kicks4LoveApp = StackNavigator({
  Home: { screen: Index }
});

export default Kicks4LoveApp;