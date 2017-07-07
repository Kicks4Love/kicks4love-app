import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },

  item: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 5
  },
});

export default class Menu extends Component {
  render() {
    return(
      <ScrollView scrollsToTop={false} style={styles.menu}>

        <Text
          onPress={() => this.props.onItemSelected('Home')}
          style={styles.item}>
          Home
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Featured')}
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
      </ScrollView>
    )
  }
}

Menu.propTypes = {
  onItemSelected: React.PropTypes.func.isRequired
};
