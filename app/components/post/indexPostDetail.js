import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageP from 'react-native-image-progress';
import Loader from '../loader';

import indexStyles from '../../styles/index.styles';

const WIDTH = Dimensions.get('window').width;

var getPostStr = require('../../helpers/getPostStr');

const IndexPostDetail = ( { metadata, navigation } ) => {
  return (
    <TouchableOpacity style={indexStyles.box} onPress={() => navigation.navigate('Show', {postType: metadata.post_type, id: metadata.post.id, title: metadata.post.title})}>
      <ImageP 
        source={{uri: metadata.image_url, width: WIDTH * 0.4, height: 100}} 
        style={indexStyles.coverImage} 
        indicator={<Loader type='initial' />}
      />
      <View style={indexStyles.boxContent}>
        <Text style={indexStyles.boxTitle}>{metadata.post.title} <Text style={indexStyles.boxDate}>{metadata.post.created_at.slice(0, 10)}</Text></Text>
        <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{getPostStr(metadata.post_type, 'title')}</Text></Text>
        <Text style={indexStyles.boxRate}>{metadata.score.toFixed(1)}/5.0 <Image source={require('../../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
      </View>
    </TouchableOpacity>
  )
};

const IndexPostDetailWithNavigation = withNavigation(IndexPostDetail);

export default IndexPostDetailWithNavigation;