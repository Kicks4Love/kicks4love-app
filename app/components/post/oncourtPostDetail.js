import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { marginContent, postContainer, postBackgroundImage, postInnerFrame, topInfo, date, ratingImage, moreLink } from '../../styles/oncourt.styles';

const OnCourtPostDetail = ( { metadata, navigation } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  let name = metadata.post.player_name.split(' ');
  const firstName = name[0];
  const lastName = name[1] ? name[1] : '';

  let rating = [];
  for (var i = 0; i < metadata.score; i++)
    rating.push(<Image key={i} source={require('../../images/sneakerwhite.png')} style={ratingImage} />);

  return (
    <View style={[marginContent, postContainer]}>
      <Image source={{uri: metadata.image_url}} style={postBackgroundImage}>
        <View style={postInnerFrame}>
          <View style={topInfo}>
            <Text style={date}>{metadata.post.created_at.slice(0, 10)}</Text>
            {rating}
            <Text onPress={() => navigation.navigate('Show', {postType: 'oncourt', id: metadata.post.id, title: metadata.post.title})} style={moreLink}>more</Text>
          </View>
        </View>
      </Image>
    </View>
  )
};

const OnCourtPostDetailWithNavigation = withNavigation(OnCourtPostDetail);

export default OnCourtPostDetailWithNavigation;