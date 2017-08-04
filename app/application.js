import React, { Component } from 'react';
import { Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Storage from 'react-native-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import Drawer from './components/other/drawer';
import Index from './components/index'
import Features from './components/features';
import Calendar from './components/calendar';
import Trend from './components/trend';
import OnCourt from './components/oncourt';
import Rumor from './components/rumor';
import StreetSnap from './components/streetsnap'
import Search from './components/search';
import Show from './components/show';
import Setting from './components/setting';
import Contact from './components/contact';

const appStyles = require('./styles/application.styles');

var storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true
});
global.storage = storage;

global.gaTracker = require('./helpers/gaTracker');

const navigationOptions = ({navigation}) => ({
  title: 'Kicks4love',
  headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e7e7e7' },
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

const mainStack = StackNavigator({
  Home: { screen: Index },
  Features: { screen: Features },
  Calendar: { screen: Calendar },
  Trend: { screen: Trend },
  Search: {screen: Search },
  OnCourt: { screen: OnCourt },
  Rumor: { screen: Rumor },
  StreetSnap: {screen: StreetSnap},
  Show: { screen: Show }
}, {
  navigationOptions: navigationOptions,
  headerMode: 'none'
});

const appStack = StackNavigator({
  Main: { screen: mainStack },
  Setting: { screen: Setting },
  Contact: { screen: Contact }
}, {
  mode: 'modal'
});

const app = DrawerNavigator({
  Home: { screen: appStack },
  Features: { screen: Features },
  Calendar: { screen: Calendar },
  Trend: {screen: Trend},
  OnCourt: { screen: OnCourt },
  StreetSnap: {screen: StreetSnap},
  Rumor: { screen: Rumor }
}, {
  contentComponent: Drawer
});

export default app;