import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Panel from './other/panel';
import Icon from 'react-native-vector-icons/FontAwesome';

import { headerLeft } from '../styles/application.styles';
import contactStyles from '../styles/contact.styles';

export default class Contact extends Component {
  static navigationOptions = ({navigation}) => ({
  	title: 'Contact Us',
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
          <View style={contactStyles.panel}>
            <Panel title='About Us' shouldExpand = {true}>
              <Text>Hi this is the <Text style={contactStyles.boldText}>Kicks4Love鞋侣</Text> team, we are a group of sneaker enthusiasts aiming to provide users with the latest sneaker release date as well as posts regarding the most popular trend. Currently we are still under development stage, which means there could still be some defects and bugs which we are not aware of. If that ever happens, feel free to get in touch with us and tell us what you think about our website. Any suggestions would be greatly appreciated : )</Text>
            </Panel>
          </View>
          <View style={contactStyles.panel}>
            <Panel title='Our Plan' shouldExpand = {false}>
              <Text>In addition to the current web pages we provide, we will also introduce a series of features which will significantly boost our user experience. First, we will set up user accounts for each unique user, and we will also implement login options including <Text onPress={() => Linking.openURL('https://www.facebook.com/')} style={contactStyles.linkText}>Facebook</Text> and <Text onPress={() => Linking.openURL('https://weibo.com')} style={contactStyles.linkText}>Weibo</Text> account authentication. With identification included, users will be able to leave comments in each of our posts so that we can answer their doubts or discuss interesting topics together. Moreover, we will also construct seamless communication to allow users to share their ideas or discuss their opinions.{'\n\n'}In our current stage, our primary concern would be accumulating hit-rate for our website across all the social media platforms, and when the time comes, we will also set up E-Commerce marketplace to propagate and sell the latest sneakers series. Cheers!!!</Text>
            </Panel>
          </View>
          <View style={contactStyles.panel}>
            <Panel title='Current Services' shouldExpand = {false}>
              <Text>So far there are 6 different pages in our website (<Text style={contactStyles.underlineText}>Features</Text>, <Text style={contactStyles.underlineText}>Calendar</Text>, <Text style={contactStyles.underlineText}>Trend</Text>, <Text style={contactStyles.underlineText}>On Court</Text>, <Text style={contactStyles.underlineText}>Street Snap</Text> and <Text style={contactStyles.underlineText}>Rumors</Text>), and each of which concludes the unique aspects of sneaker news.</Text>
            </Panel>
          </View>
  			</ScrollView>
  		);
  	}
}