import React, {Component} from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
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
      this.props.navigation.navigate(currentPage);
      this.state.currentPage = currentPage;
    }
  }

  render() {
    return(
      <View style={styles.drawerContainer}>
        <Image source={require('../images/main_logo.png')} style={styles.drawerImage} />
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <Text style={styles.menuItem} onPress={() => this.navigate('Home')}>Home</Text>
          <Text style={styles.menuItem} onPress={() => this.navigate('Features')}>Features</Text>
          <Text style={styles.menuItem}>Calendar</Text>
          <Text style={styles.menuItem}>On Court</Text>
          <Text style={styles.menuItem}>Trend</Text>
          <Text style={styles.menuItem}>Street Snaps</Text>
          <Text style={styles.menuItem}>Rumors</Text>
          <View style={styles.menuItemMoreContainer}>
            <View style={styles.meunItemMoreItem}><Icon name="cog" style={{fontSize: 16}} /><Text style={styles.menuItemMoreItemText}> Setting</Text></View>
            <View style={styles.meunItemMoreItem}><Icon name="envelope" style={{fontSize: 14}} /><Text style={styles.menuItemMoreItemText}> Contact Us</Text></View>
          </View>
        </ScrollView>
      </View>
    )
  }
}