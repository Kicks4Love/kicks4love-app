import React, { PureComponent } from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#d2d1d1',
    marginLeft: 5,
    height: 35
  }
})
export default class LanguagePicker extends PureComponent {

  render() {
    const selectedIcon = this.props.selected ? (<Icon name="check" size={16} color='#00e600' />) : null;
    return(
        <TouchableOpacity
          onPress={ this.props.onPress }>
          <View style={styles.container}>
          <Text>{this.props.language}</Text>
          { selectedIcon }
          </View>
        </TouchableOpacity>
    )
  }

}
