import React, { Component } from 'react';
import {ActivityIndicator, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Drawer from './components/Drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Features from './features';

const styles = require('./styles/index.styles');

class Index extends Component {

  componentWillMount() {
    fetch('https://4f2f9aed.ngrok.io/api/v0/featured_posts?next_page=1')
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({
          dataRecord: responseJson.posts,
          isLoading: false
        })
    });
  }

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
    this.state = {
      dataRecord:[],
      isLoading: true
    };
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Kicks4Love Mobile App! {this.state.dataRecord.posts}
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