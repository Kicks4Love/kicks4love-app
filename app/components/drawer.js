import React, {Component} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 25,
  },
  drawerImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  menuItem: {
    fontSize: 25,
    fontWeight: '200',
    marginTop: 5,
    textAlign: 'center'
  },
  menuItemMoreContainer: {
    padding: 5,
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    marginTop: 10
  },
  meunItemMoreItem: {
    flexDirection: 'row',
    marginTop: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuItemMoreItemText: {
    fontWeight: '200',
    fontSize: 17
  }
});

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'Home'};
  }

  navigate(currentPage) {
    if (this.state.currentPage == currentPage)
      this.props.navigation.navigate('DrawerClose');
    else {
      this.props.navigation.dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [ NavigationActions.navigate({routeName: currentPage}) ]
        }));
      this.state.currentPage = currentPage;
    }
  }

  render() {
    return(
      <View style={styles.drawerContainer}>
        <Image source={require('../images/main_logo.png')} style={styles.drawerImage} />
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <TouchableOpacity onPress={() => this.navigate('Home')}><Text style={styles.menuItem}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Features')}><Text style={styles.menuItem}>Features</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Calendar')}><Text style={styles.menuItem}>Calendar</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Trend')}><Text style={styles.menuItem}>Trend</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('OnCourt')}><Text style={styles.menuItem}>On Court</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.menuItem}>Street Snaps</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Rumor')}><Text style={styles.menuItem}>Rumors</Text></TouchableOpacity>
          <View style={styles.menuItemMoreContainer}>
            <TouchableOpacity style={styles.meunItemMoreItem}><Icon name="cog" style={{fontSize: 16}} /><Text style={styles.menuItemMoreItemText}> Setting</Text></TouchableOpacity>
            <TouchableOpacity style={styles.meunItemMoreItem}><Icon name="envelope" style={{fontSize: 14}} /><Text style={styles.menuItemMoreItemText}> Contact Us</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}
