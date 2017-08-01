import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import ImageProgress from 'react-native-image-progress';
import Loader from '../other/loader';

import { postContainer, postBackgroundImage, textColor, titleContainer, title, description, infoContainer, rating, ratingImage, date } from '../../styles/streetsnap.styles';

const StreetSnapPostDetail = ( { metadata, navigation } ) => {
  return (
    <View style={postContainer}>
      <Image source={{uri: metadata.image_url}} style={postBackgroundImage}>
        <View style={titleContainer}>
          <Text style={[textColor, title]}>{metadata.post.title.toUpperCase()}</Text>
        </View>
        <TouchableWithoutFeedback>
          <View style={description}>
            <View style={infoContainer}>
              <View style={rating}>
                <Image source={Math.round(metadata.score) >= 1 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                <Image source={Math.round(metadata.score) >= 2 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                <Image source={Math.round(metadata.score) >= 3 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                <Image source={Math.round(metadata.score) >= 4 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                <Image source={Math.round(metadata.score) == 5 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
              </View>
              <Text style={date}>{metadata.post.created_at.slice(0, 10)}</Text>
            </View>
            <Text style={textColor}>{metadata.post.content[0].slice(0, 110)}...</Text>
          </View>
        </TouchableWithoutFeedback>
      </Image>
    </View>
  );
};

const StreetSnapPostDetailWithNavigation = withNavigation(StreetSnapPostDetail);

export default StreetSnapPostDetailWithNavigation;