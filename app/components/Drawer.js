import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20
  },
  drawerItem: {
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
      <ScrollView scrollsToTop={false} style={styles.drawerContainer}>
        <Text style={styles.drawerItem} onPress={() => this.navigate('Home')}>Home</Text>
        <Text style={styles.drawerItem} onPress={() => this.navigate('Features')}>Features</Text>
        <Text style={styles.drawerItem}>On Court</Text>
        <Text style={styles.drawerItem}>Trend</Text>
        <Text style={styles.drawerItem}>Street Snaps</Text>
        <Text style={styles.drawerItem}>Rumors</Text>
      </ScrollView>
    )
  }
}