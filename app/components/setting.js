import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, FlatList, Platform, BackHandler } from 'react-native';
import I18n from '../i18n/I18n';

import { headerLeft } from '../styles/application.styles';
import LanguagePicker from './LanguagePicker';

export default class Setting extends Component {
  	static navigationOptions = ({navigation}) => ({
  		title: I18n.t("settings"),
  		headerLeft: (
		    <TouchableOpacity onPress={ () => navigation.dispatch(NavigationActions.reset(
          {
            index: 0,
            actions: [ NavigationActions.navigate({routeName: 'Main'}) ]
          })) } >
		      	<Icon name="times" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e7e7e7' }
	});

  constructor(props) {
    super(props);
    gaTracker.trackScreenView('Setting');
    let langList = [];
    for (var key in I18n.translations) {
      if (I18n.translations.hasOwnProperty(key)) {
        langList.push({ lang: key, selected: key == I18n.locale.substr(0, 2) });
      }
    }
    this.state = {
      language: I18n.locale.substr(0, 2),
      languageList: langList
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._handleSettingsBack);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._handleSettingsBack);
    }
  }

  _handleSettingsBack = () => {
    const goHome = NavigationActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({routeName: 'Main'}) ]
    });
    this.props.navigation.dispatch(goHome);
    return true;
  }

	render() {
		return (
      <View>
        <Text>{I18n.t('language')}</Text>
        <FlatList
          data={this.state.languageList}
          extraData={this.state}
          keyExtractor={(item) => item.lang}
          renderItem={this._renderItem}
        />

      </View>
    )
	}

  _renderItem = ({item}) => (
    <LanguagePicker
      language={I18n.translations[this.state.language][item.lang]}
      selected={item.selected}
      onPress={() => this.setLanguage(item.lang)}
    />
  )

  setLanguage(lang) {
    let newList = this.state.languageList.map( (item) => {
      item.selected = item.lang == lang;
      return item;
    });
    this.setState({
      language: lang,
      languageList: newList
    });
    I18n.locale = lang;
  }

}
