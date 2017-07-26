import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { postContainer, postContentTitle, subtitleContainer, postContentSubtitle, date, rateImage, postContentPreview, marginContent } from '../../styles/rumor.styles';

const WIDTH = Dimensions.get('window').width;

const RumorPostDetail = ( { metadata, navigation } ) => {
  return (
    <View style={postContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'rumors', id: metadata.post.id, title: metadata.post.title})}>
        <Text style={postContentTitle}>{metadata.post.title.toUpperCase()}</Text>
      </TouchableOpacity>
      <View style={subtitleContainer}>
        <View style={postContentSubtitle}>
          <Text style={date}>{metadata.post.created_at.slice(0, 10)} ~ </Text>
          <Image source={Math.round(metadata.score) >= 1 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={rateImage} />
          <Image source={Math.round(metadata.score) >= 2 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={rateImage} />
          <Image source={Math.round(metadata.score) >= 3 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={rateImage} />
          <Image source={Math.round(metadata.score) >= 4 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={rateImage} />
          <Image source={Math.round(metadata.score) >= 5 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={rateImage} />
        </View>
      </View>
      <Text style={[marginContent, postContentPreview]}>
        <Text>{metadata.post.content[0].substring(0, 120)}... </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'rumors', id: metadata.post.id, title: metadata.post.title})}><Text>more</Text></TouchableOpacity>
      </Text>
    </View>
  );
};

const RumorPostDetailWithNavigation = withNavigation(RumorPostDetail);

export default RumorPostDetailWithNavigation;