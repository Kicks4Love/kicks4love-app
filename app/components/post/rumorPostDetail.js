import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { postContainer, postContent, postContentTitle, ratingImage, postContentDate, coverImage,titleText } from '../../styles/rumor.styles';

const WIDTH = Dimensions.get('window').width;

const RumorPostDetail = ( { metadata, navigation } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  let rating = [];
  for (var i = 0; i < metadata.score; i++)
    rating.push(<Image source={require('../../images/sneakerwhite.png')} style={ratingImage} />);

  return (
      <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'rumor', id: metadata.post.id, title: metadata.post.title})} style={[{width: WIDTH - 30}, postContainer]}>
        <View style= {[postContainer]}>
              <Text style={[postContentTitle]}>{metadata.post.title.toUpperCase()}</Text>
              <Text style={[postContentDate]}>{metadata.post.created_at.slice(0, 10)} ~ {metadata.score.toFixed(1)}/5.0</Text>
              <Text style={[titleText]}>{`${metadata.post.content[0].substring(0, 120)}...`}</Text>
              <Image source={coverImgSrc} style={coverImage}/>
        </View>
      </TouchableOpacity>
  );
};

const RumorPostDetailWithNavigation = withNavigation(RumorPostDetail);

export default RumorPostDetailWithNavigation;
