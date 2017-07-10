import React, {Component} from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 25
  },
  drawerImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  menuItem: {
    fontSize: 25,
    fontWeight: '200',
    paddingTop: 5,
    textAlign: 'center'
  },
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
        </ScrollView>
      </View>
    )
  }
}