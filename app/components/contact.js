import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity } from 'react-native';

import { headerLeft } from '../styles/application.styles';

export default class Contact extends Component {
  	static navigationOptions = ({navigation}) => ({
  		title: 'Contact',
  		headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="chevron-left" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e7e7e7' }
	});

  	render() {
  		return <Text>Placeholder</Text>;
  	}
}