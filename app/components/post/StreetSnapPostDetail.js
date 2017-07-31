import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ImageP from 'react-native-image-progress';
import Loader from '../loader';
import { withNavigation } from 'react-navigation';

const WIDTH = Dimensions.get('window').width;

const StreetSnapPostDetail = ( { metadata, navigation } ) => {
  let rating = [];
  for (var i = 0; i < metadata.score; i++)
    rating.push(<Image source={require('../../images/sneakerwhite.png')} />);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'streetsnap', id: metadata.post.id, title: metadata.post.title})} >
      <ImageP source={{uri: metadata.image_url}} indicator={<Loader type='initial' />} >
        <View>
          <View>
            {rating}
          </View>
          <View>
            <Text>{metadata.post.title.toUpperCase()}</Text>
            <Text>{metadata.post.content}</Text>
            <Text>{metadata.post.created_at.slice(0, 10)}</Text>
          </View>
        </View>
      </ImageP>
    </TouchableOpacity>
  );
};

const StreetSnapPostDetailWithNavigation = withNavigation(StreetSnapPostDetail);

export default StreetSnapPostDetailWithNavigation;