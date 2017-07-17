import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import indexStyles from '../../styles/index.styles';

const WIDTH = Dimensions.get('window').width;

const IndexPostDetail = ( { metadata } ) => {
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
    <View style={indexStyles.box}>
      <Image source={{uri: metadata.image_url, width: WIDTH * 0.4, height: 100}} style={indexStyles.coverImage} />
      <View style={indexStyles.boxContent}>
        <Text style={indexStyles.boxTitle}>{metadata.post.title} <Text style={indexStyles.boxDate}>{metadata.post.created_at.slice(0, 10)}</Text></Text>
        <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{tag}</Text></Text>
        <Text style={indexStyles.boxRate}>{metadata.score}/5.0 <Image source={require('../../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
      </View>
    </View>
  )
};

export default IndexPostDetail;