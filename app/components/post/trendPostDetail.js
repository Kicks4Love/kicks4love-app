import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Loader from '../loader';
import { withNavigation } from 'react-navigation';
import { postContainer, postContent, postBackgroundImage, postInnerFrame, colorWhite, postContentTitle, ratingContainer, ratingImage, postContentDate } from '../../styles/trend.styles';

const WIDTH = Dimensions.get('window').width;

const TrendPostDetail = ( { metadata, navigation } ) => {
  let rating = [];
  for (var i = 0; i < metadata.score; i++)
    rating.push(<Image key={i} source={require('../../images/sneakerwhite.png')} style={ratingImage} />);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'trend', id: metadata.post.id, title: metadata.post.title})} style={[{width: WIDTH - 30}, postContainer]}>
      <Image source={{uri: metadata.image_url}} style={postBackgroundImage}>
        <View style={postInnerFrame}>
          <View style={ratingContainer}>
            {rating}
          </View>
          <View style={postContent}>
            <Text style={[colorWhite, postContentTitle]}>{metadata.post.title.toUpperCase()}</Text>
            <Text style={[colorWhite, postContentDate]}>{metadata.post.created_at.slice(0, 10)}</Text>
          </View>
        </View>
      </Image>
    </TouchableOpacity>
  );
};

const TrendPostDetailWithNavigation = withNavigation(TrendPostDetail);

export default TrendPostDetailWithNavigation;