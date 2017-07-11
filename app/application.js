import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Drawer from './components/Drawer';
import Index from './components/index'
import Features from './components/features';

const appStyles = require('./styles/application.styles');

const navigationOptions = props => ({
  title: 'Kicks4love',
  headerTitle: <Image source={require('./images/nav_logo.png')} style={appStyles.logo} />,
  headerStyle: { backgroundColor: '#fff' },
  headerLeft: (
    <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')} >
      <Icon name="bars" style={appStyles.menu} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity>
      <Icon name="search" style={appStyles.search} />
    </TouchableOpacity>
  )
});

const stack = StackNavigator({
  Home: { screen: Index },
  Features: { screen: Features }
}, {
  navigationOptions: navigationOptions,
});

const app = DrawerNavigator({
  Home: { screen: stack },
  Features: { screen: Features }
}, {
  contentComponent: Drawer
});

export default app;