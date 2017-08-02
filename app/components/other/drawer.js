import React, {Component} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import I18n from '../i18n/I18n';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 25,
  },
  drawerImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  menuItem: {
    color: '#333',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 5,
    textAlign: 'center'
  },
  menuItemMoreContainer: {
    padding: 5,
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    marginTop: 10
  },
  meunItemMoreItem: {
    flexDirection: 'row',
    marginTop: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuItemMoreItemText: {
    color: '#333',
    fontWeight: '200',
    fontSize: 17
  },
  menuItemSocialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  menuItemSocialIcon: {
    marginLeft: 6,
    marginRight: 6
  }
});

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'Home'};
  }

  navigate(currentPage, extraParams={}) {
    if (this.state.currentPage == currentPage)
      this.props.navigation.navigate('DrawerClose');
    else {
      this.props.navigation.dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [ NavigationActions.navigate({routeName: currentPage, params: extraParams}) ]
        }));
      this.state.currentPage = currentPage;
    }
  }

  render() {
    return(
      <View style={styles.drawerContainer}>
        <Image source={require('../../images/main_logo.png')} style={styles.drawerImage} />
        <ScrollView scrollsToTop={false} style={styles.menu}>
        <TouchableOpacity onPress={() => this.navigate('Home')}>
          <Text style={styles.menuItem}>{I18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('Features', { lang: I18n.locale, title: I18n.t('features') })}>
          <Text style={styles.menuItem}>{I18n.t('features')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('Calendar', { lang: I18n.locale, title: I18n.t('calendar') })}>
          <Text style={styles.menuItem}>{I18n.t('calendar')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('Trend', { lang: I18n.locale, title: I18n.t('trend') })}>
          <Text style={styles.menuItem}>{I18n.t('trend')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('OnCourt', { lang: I18n.locale, title: I18n.t('oncourt') })}>
          <Text style={styles.menuItem}>{I18n.t('oncourt')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('StreetSnap', { lang: I18n.locale, title: I18n.t('streetsnap') })}>
          <Text style={styles.menuItem}>{I18n.t('streetsnap')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('Rumor', { lang: I18n.locale, title: I18n.t('rumors') })}>
          <Text style={styles.menuItem}>{I18n.t('rumors')}</Text>
        </TouchableOpacity>
        <View style={styles.menuItemMoreContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')} style={styles.meunItemMoreItem}><Icon name="cog" size={16} color='#333' /><Text style={styles.menuItemMoreItemText}>{ I18n.t('settings') }</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact')} style={styles.meunItemMoreItem}><Icon name="envelope" size={14} color='#333' /><Text style={styles.menuItemMoreItemText}>{ I18n.t('contact') }</Text></TouchableOpacity>
        </View>
          <View style={styles.menuItemSocialContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/kicks4love')} style={styles.menuItemSocialIcon}><Icon name="facebook" size={23} color='#333' /></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('http://weibo.com/u/5704994024')} style={styles.menuItemSocialIcon}><Icon name="weibo" size={23} color='#333' /></TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/kicks4love')} style={styles.menuItemSocialIcon}><Icon name="instagram" size={23} color='#333' /></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}
