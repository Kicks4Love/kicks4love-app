import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageProgress from 'react-native-image-progress';
import I18n from '../../i18n/I18n';

import indexStyles from '../../styles/index.styles';

const WIDTH = Dimensions.get('window').width;

var getPostStr = require('../../helpers/getPostStr');

const IndexPostDetail = ( { metadata, navigation } ) => {
  return (
    <TouchableOpacity style={indexStyles.box} onPress={() => navigation.navigate('Show', {postType: metadata.post_type, id: metadata.post.id, title: metadata.post.title})}>
      <View style={[{width: WIDTH * 0.4, height: 100}, indexStyles.coverImage]}>
        <ImageProgress source={{uri: metadata.image_url}} style={{width: WIDTH * 0.4, height: 100}} />
      </View>
      <View style={indexStyles.boxContent}>
        <Text style={indexStyles.boxTitle}>{metadata.post.title} <Text style={indexStyles.boxDate}>{metadata.post.created_at.slice(0, 10)}</Text></Text>
        <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{I18n.t(metadata.post_type)}</Text></Text>
        <Text style={indexStyles.boxRate}>{metadata.score.toFixed(1)}/5.0 <Image source={require('../../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
      </View>
    </TouchableOpacity>
  )
};

const IndexPostDetailWithNavigation = withNavigation(IndexPostDetail);

export default IndexPostDetailWithNavigation;
