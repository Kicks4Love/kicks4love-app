import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import Loader from '../loader';
import ImageP from 'react-native-image-progress';
import { postContainer, coverImage, contentContainer, subInfoContainer, titleText, date, rate, rateImage, divider, contentText, more } from '../../styles/features.styles';

const FeaturePostDetail = ( { metadata, navigation } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  return (
    <View style={postContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'features', id: metadata.post.id, title: metadata.post.title})}>
        <ImageP source={coverImgSrc} style={coverImage} indicator={<Loader type='initial' />} />
      </TouchableOpacity>
      <View style={contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'features', id: metadata.post.id, title: metadata.post.title})}><Text style={titleText}>{metadata.post.title}</Text></TouchableOpacity>
        <View style={subInfoContainer}>
          <Text style={date}>{metadata.post.created_at.substring(0, 10)}</Text>
          <Text style={rate}>{metadata.score.toFixed(1)}/5.0 <Image source={require('../../images/sneakerblack.png')} style={rateImage} /></Text>
          <View style={divider}></View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'features', id: metadata.post.id, title: metadata.post.title})}><Text style={contentText}>{`${metadata.post.content[0].substring(0, 80)}...`}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'features', id: metadata.post.id, title: metadata.post.title})}><Text style={more}>more</Text></TouchableOpacity>
      </View>
    </View>
  )
};

const FeaturePostDetailWithNavigation = withNavigation(FeaturePostDetail);

export default FeaturePostDetailWithNavigation;