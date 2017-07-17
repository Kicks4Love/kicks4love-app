import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { postContainer, coverImage, contentContainer, subInfoContainer, titleText, date, rate, rateImage, divider, contentText, more } from '../../styles/features.styles';

const FeaturePostDetail = ( { metadata } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  return (
    <View style={postContainer}>
      <View>
        <Image source={coverImgSrc} style={coverImage}/>
      </View>
      <View style={contentContainer}>
        <Text style={titleText}>{metadata.post.title}</Text>
        <View style={subInfoContainer}>
          <Text style={date}>{metadata.post.created_at.substring(0, 10)}</Text>
          <Text style={rate}>{metadata.score}/5.0 <Image source={require('../../images/sneakerblack.png')} style={rateImage} /></Text>
          <View style={divider}></View>
        </View>
        <Text style={contentText}>{`${metadata.post.content[0].substring(0, 80)}...`}</Text>
        <Text style={more}>more</Text>
      </View>
    </View>
  )
};

export default FeaturePostDetail;