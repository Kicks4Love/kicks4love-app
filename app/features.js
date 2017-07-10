import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Drawer from './components/Drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('./styles/index.styles');

export default class Index extends Component {
  // TODO: extract navigationOptions to a helper method
  static navigationOptions = props => ({ 
    title: 'Features',
    drawerLabel: 'Features',
    headerStyle: { backgroundColor: '#f8f8f8'},
    headerLeft: (
      <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')} >
        <Icon name="bars" style={styles.menu} />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Features!
        </Text>
      </View>
    );
  }
}