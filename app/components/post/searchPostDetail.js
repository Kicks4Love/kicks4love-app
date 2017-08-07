import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageProgress from 'react-native-image-progress';

import searchStyles from '../../styles/search.styles';
import I18n from '../../i18n/I18n';

const WIDTH = Dimensions.get('window').width;

var getPostStr = require('../../helpers/getPostStr');
var navigate = function(metadata, navigation) {
  if (metadata.post_type == 'calendar') {
    navigation.dispatch(NavigationActions.reset(
      {
        index: 0,
        actions: [ NavigationActions.navigate({routeName: 'Calendar', params: {date: new Date(metadata.post.release_date)}}) ]
      }));
    return;
  }
  navigation.navigate('Show', {postType: metadata.post_type, id: metadata.post.id});
}

const SearchPostDetail = ( { metadata, navigation } ) => {
  let rating = null;
  if (metadata.post_type != 'calendar')
    rating = <Text style={searchStyles.boxRate}>{metadata.score.toFixed(1)}/5.0 <Image source={require('../../images/sneakerblack.png')} style={searchStyles.boxRateImage} /></Text>;

  return (
  	<TouchableOpacity style={searchStyles.box} onPress={() => navigate(metadata, navigation)}>
      <View style={[{width: WIDTH * 0.4, height: 100}, searchStyles.coverImage]}>
        <ImageProgress source={{uri: metadata.image_url}} style={{width: WIDTH * 0.4, height: 100}} />
      </View>
      <View style={searchStyles.boxContent}>
        <Text style={[searchStyles.textColor, searchStyles.boxTitle]}>{metadata.title} <Text style={searchStyles.boxDate}>{metadata.post.created_at.slice(0, 10)}</Text></Text>
        <Text style={[searchStyles.textColor, searchStyles.boxPostType]}><Icon name="tags" /><Text style={searchStyles.boxPostTypeText}>{ I18n.t(metadata.post_type) }</Text></Text>
        {rating}
      </View>
    </TouchableOpacity>
  )
};

const SearchPostDetailWithNavigation = withNavigation(SearchPostDetail);

export default SearchPostDetailWithNavigation;
