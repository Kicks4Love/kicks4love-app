import React, { PureComponent } from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e7e7e7',
    height: 35
  },
  textColor: {
    color: '#333'
  }
});

export default class LanguagePicker extends PureComponent {

  render() {
    const selectedIcon = this.props.selected ? (<Icon name="check" size={16} color='#999999' />) : null;
    return(
        <TouchableOpacity
          onPress={ this.props.onPress }>
          <View style={styles.container}>
          <Text style={styles.textColor}>{this.props.language}</Text>
          { selectedIcon }
          </View>
        </TouchableOpacity>
    )
  }

}