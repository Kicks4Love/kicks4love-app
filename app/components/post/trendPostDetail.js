import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const TrendPostDetail = ( { metadata } ) => {
  const cover_img_src = { uri: metadata.image_url };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={cover_img_src}
          style={coverImage}/>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    elevation: 1,
    borderWidth: 0,
    borderRadius: 2,
    borderBottomWidth: 0,
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1,
    height: 250,
    width: null
  },
  titleText:{
    fontSize: 30,
    fontWeight : 'bold'
  },
  subInfoContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subText: {
    fontSize: 12,
    color: '#B6B5B5'
  },
  contentText: {
    fontSize: 15,
    color: '#29293d'
  },
  detailSectionContainer: {
    margin: 5,
    alignItems: 'center'
  }
});

const {
  container,
  coverImage,
  subInfoContainer,
  titleText,
  subText,
  contentText,
  detailSectionContainer
} = styles;

export default TrendPostDetail;