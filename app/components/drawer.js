import React, {Component} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
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
    color: '#333',
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
    color: '#333',
    fontWeight: '200',
    fontSize: 17
  },
  menuItemSocialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  menuItemSocialIcon: {
    marginLeft: 6,
    marginRight: 6
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
            <TouchableOpacity style={styles.meunItemMoreItem}><Icon name="cog" size={16} color='#333' /><Text style={styles.menuItemMoreItemText}> Setting</Text></TouchableOpacity>
            <TouchableOpacity style={styles.meunItemMoreItem}><Icon name="envelope" size={14} color='#333' /><Text style={styles.menuItemMoreItemText}> Contact Us</Text></TouchableOpacity>
          </View>
          <View style={styles.menuItemSocialContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/kicks4love')} style={styles.menuItemSocialIcon}><Icon name="facebook" size={23} color='#333' /></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('http://weibo.com/u/5704994024')} style={styles.menuItemSocialIcon}><Icon name="weibo" size={23} color='#333' /></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/kicks4love')} style={styles.menuItemSocialIcon}><Icon name="instagram" size={23} color='#333' /></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}