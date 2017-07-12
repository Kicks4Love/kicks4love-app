import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const FeaturePostDetail = ( { metadata } ) => {
  const cover_img_src = { uri: metadata.image_url };
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={cover_img_src}
          style={coverImage}/>
      </View>
      <View>
        <Text style={titleText}>{metadata.post.title}</Text>
      </View>
      <View style={subInfoContainer}>
        <Text style={subText}>{metadata.post.created_at.substring(0, 10)}</Text>
        <Text style={subText}>{`${metadata.score}/5.0`}</Text>
      </View>
      <View>
        <Text style={contentText}>{metadata.post.content[0].substring(0, 50)}</Text>
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
    // resizeMode: 'contain',
    flex: 1,
    height: 250,
    width: null
  },
  titleText:{
    fontSize: 30,
    fontWeight : 'bold'
  },
  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subText: {
    fontSize: 10,
    color: '#B6B5B5'
  },
  contentText: {
    fontSize: 15,
    color: '#29293d'
  }
});

const {container,
  coverImage,
  subInfoContainer,
  titleText,
  subText,
  contentText
} = styles;

export default FeaturePostDetail;
