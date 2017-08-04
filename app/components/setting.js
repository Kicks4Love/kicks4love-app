import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity } from 'react-native';

import { headerLeft } from '../styles/application.styles';

export default class Setting extends Component {
  	static navigationOptions = ({navigation}) => ({
  		title: 'Setting',
  		headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="times" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e7e7e7' }
	});

	constructor(props) {
		super(props);
	    gaTracker.trackScreenView('Setting');
	}

  	render() {
  		return <Text>Placeholder</Text>;
  	}
}