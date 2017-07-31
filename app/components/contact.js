import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { headerLeft } from '../styles/application.styles';
import contactStyles from '../styles/contact.styles';

export default class Contact extends Component {
  	static navigationOptions = ({navigation}) => ({
  		title: 'Contact',
  		headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="times" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e7e7e7' }
	});

  	render() {
  		return (
  			<ScrollView style={contactStyles.container}>
  				<View style={contactStyles.contactContainer}>
  					<Text style={contactStyles.label}>Send your concern to this email address:</Text>
  					<TouchableOpacity onPress={() => Linking.openURL('mailto://customerservice@kicks4love.com')}>
  						<Text style={contactStyles.email}>customerservice@kicks4love.com</Text>
  					</TouchableOpacity>
  				</View>
  			</ScrollView>
  		);
  	}
}