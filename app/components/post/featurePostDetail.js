import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { postContainer, coverImage, subInfoContainer, titleText, subText, contentText, detailSectionContainer } from '../../styles/features.styles';

const FeaturePostDetail = ( { metadata } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  return (
    <View style={postContainer}>
      <View>
        <Image source={coverImgSrc} style={coverImage}/>
      </View>
      <View style={detailSectionContainer}>
        <Text style={titleText}>{metadata.post.title}</Text>
      </View>
      <View style={subInfoContainer}>
        <Text style={subText}>{metadata.post.created_at.substring(0, 10)}</Text>
        <Text style={subText}>{`${metadata.score}/5.0`}</Text>
      </View>
      <View style={detailSectionContainer}>
        <Text style={contentText}>{`${metadata.post.content[0].substring(0, 80)}...`}</Text>
      </View>
    </View>
  )
};

export default FeaturePostDetail;