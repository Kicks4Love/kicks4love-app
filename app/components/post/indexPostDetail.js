import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import indexStyles from '../../styles/index.styles';

const WIDTH = Dimensions.get('window').width;

const IndexPostDetail = ( { metadata, navigation } ) => {
  let tag;
  switch (metadata.post_type) {
    case 'features':
      tag = 'Features';
      break;
    case 'trend':
      tag = 'Trend';
      break;
    case 'oncourt':
      tag = 'On Court';
      break;
    case 'streetsnap':
      tag = 'Street Snap';
      break;
    case 'rumors':
      tag = 'Rumors';
      break;
  }

  return (
    <TouchableOpacity style={indexStyles.box} onPress={() => navigation.navigate('Show', {postType: tag, id: metadata.post.id})}>
      <Image source={{uri: metadata.image_url, width: WIDTH * 0.4, height: 100}} style={indexStyles.coverImage} />
      <View style={indexStyles.boxContent}>
        <Text style={indexStyles.boxTitle}>{metadata.post.title} <Text style={indexStyles.boxDate}>{metadata.post.created_at.slice(0, 10)}</Text></Text>
        <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{tag}</Text></Text>
        <Text style={indexStyles.boxRate}>{metadata.score}/5.0 <Image source={require('../../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
      </View>
    </TouchableOpacity>
  )
};

const IndexPostDetailWithNavigation = withNavigation(IndexPostDetail);

export default IndexPostDetailWithNavigation;