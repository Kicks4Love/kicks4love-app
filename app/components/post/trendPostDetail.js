import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

import { postContainer, postContent, postBackgroundImage, postInnerFrame, colorWhite, postContentTitle, ratingContainer, ratingImage } from '../../styles/trend.styles';

const WIDTH = Dimensions.get('window').width;

const TrendPostDetail = ( { metadata, navigation } ) => {
  let rating = [];
  for (var i = 0; i < metadata.score; i++)
    rating.push(<Image source={require('../../images/sneakerwhite.png')} style={ratingImage} />);

  return (
    <View style={[{width: WIDTH - 30}, postContainer]}>
      <Image source={{uri: metadata.image_url}} style={postBackgroundImage} >
        <View style={postInnerFrame}>
          <View style={ratingContainer}>
            {rating}
          </View>
          <View style={postContent}>
            <Text style={[colorWhite, postContentTitle]}>{metadata.post.title}</Text>
          </View>
        </View>
      </Image>
    </View>
  );
};

export default TrendPostDetail;