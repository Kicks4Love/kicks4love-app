import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Drawer from './components/drawer';
import Index from './components/index'
import Features from './components/features';
import Calendar from './components/calendar';
import Trend from './components/trend';
import Search from './components/search';
import Show from './components/show';

const appStyles = require('./styles/application.styles');

const navigationOptions = ({navigation}) => ({
  title: 'Kicks4love',
  headerStyle: { backgroundColor: '#fff' },
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
      <Icon name="bars" style={appStyles.headerLeft} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <Icon name="search" style={appStyles.headerRight} />
    </TouchableOpacity>
  )
});

const stack = StackNavigator({
  Home: { screen: Index },
  Features: { screen: Features },
  Calendar: { screen: Calendar },
  Trend: { screen: Trend },
  Show: { screen: Show },
  Search: {screen: Search }
}, {
  navigationOptions: navigationOptions,
});

const app = DrawerNavigator({
  Home: { screen: stack },
  Features: { screen: Features },
  Calendar: { screen: Calendar },
  Trend: {screen: Trend},
}, {
  contentComponent: Drawer
});

export default app;