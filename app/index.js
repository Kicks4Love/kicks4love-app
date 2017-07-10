import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Drawer from './components/Drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Features from './features';

const styles = require('./styles/index.styles');

class Index extends Component {
  // TODO: extract navigationOptions to a helper method
  static navigationOptions = props => ({ 
    title: 'Home',
    drawerLabel: 'Home',
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
          Welcome to Kicks4Love Mobile App!
        </Text>
      </View>
    );
  }
}

const stack = StackNavigator({
  Home: { screen: Index },
  Features: { screen: Features }
});

const app = DrawerNavigator({
  Home: { screen: stack },
  Features: { screen: Features }
}, {
  contentComponent: Drawer
});

export default app;