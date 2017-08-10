import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Panel from './other/panel';
import Icon from 'react-native-vector-icons/FontAwesome';

import { headerLeft } from '../styles/application.styles';
import contactStyles from '../styles/contact.styles';
import I18n from '../i18n/I18n';

export default class Contact extends Component {
  static navigationOptions = ({navigation}) => ({
  	title: navigation.state.params.title,
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
					<Text style={contactStyles.label}>{I18n.t("contact.emailPrompt")}:</Text>
					<TouchableOpacity onPress={() => Linking.openURL('mailto://customerservice@kicks4love.com')}>
						<Text style={contactStyles.email}>customerservice@kicks4love.com</Text>
					</TouchableOpacity>
				</View>
        <View style={contactStyles.panel}>
          <Panel title={I18n.t("contact.aboutUsTitle")} shouldExpand = {true}>
            <Text>
              {I18n.t("contact.aboutUsContent_1")}
              <Text style={contactStyles.boldText}>
                {I18n.t('appName')}
              </Text>
              {I18n.t('contact.aboutUsContent_2')}
            </Text>
          </Panel>
        </View>
        <View style={contactStyles.panel}>
          <Panel title={I18n.t("contact.ourPlanTitle")} shouldExpand = {false}>
            <Text>
              { I18n.t("contact.ourPlanContent_1") }
              <Text onPress={() => Linking.openURL('https://www.facebook.com/')} style={contactStyles.linkText}>
                { I18n.t('facebook') }
              </Text>
              { I18n.t('and') }
              <Text onPress={() => Linking.openURL('https://weibo.com')} style={contactStyles.linkText}>
                { I18n.t("weibo") }
              </Text>
              { I18n.t("contact.ourPlanContent_2") }
            </Text>
          </Panel>
        </View>
        <View style={contactStyles.panel}>
          <Panel title={I18n.t("contact.currentServicesTitle")} shouldExpand = {false}>
            <Text>
              {I18n.t("contact.currentServicesContent_1")} (
                <Text style={contactStyles.underlineText}>{I18n.t('features')}</Text>, <Text style={contactStyles.underlineText}>{I18n.t('calendar')}</Text>, <Text style={contactStyles.underlineText}>{I18n.t('trend')}</Text>, <Text style={contactStyles.underlineText}>{I18n.t('oncourt')}</Text>, <Text style={contactStyles.underlineText}>{I18n.t("streetsnap")}</Text> {I18n.t('and')} <Text style={contactStyles.underlineText}>{I18n.t("rumors")}</Text>
              ){I18n.t("contact.currentServicesContent_2")}
            </Text>
          </Panel>
        </View>
			</ScrollView>
		);
	}
}