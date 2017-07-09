import React, {Component} from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  item: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 5
  },
});

export default class Drawer extends Component {
  render() {
    return(
      <ScrollView scrollsToTop={false} style={styles.menu}>

        <Text
          onPress={() => this.props.onItemSelected('Home')}
          style={styles.item}>
          Home
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Features')}
          style={styles.item}>
          Featured
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('On Court')}
          style={styles.item}>
          On Court
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Trend')}
          style={styles.item}>
          Trend
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Street Snaps')}
          style={styles.item}>
          Street Snaps
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Rumors')}
          style={styles.item}>
          Rumors
        </Text>
      </ScrollView>
    )
  }
}