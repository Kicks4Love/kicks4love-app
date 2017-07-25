import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { postContainer, coverImage, contentContainer, subInfoContainer, titleText, date, rate, rateImage, divider, contentText, more } from '../../styles/features.styles';

const OncourtPostDetail = ( { metadata, navigation } ) => {
  const coverImgSrc = { uri: metadata.image_url };
  let name = metadata.post.player_name.split(' ');
  const firstName = name[0];
  const lastName = name[1] ? name[1] : '';
  return (
    <View style={OncourtStyles.postContainer}>
      <Image
        source={coverImgSrc}
        style={OncourtStyles.coverImage}>
        <View>
          <Text style={OncourtStyles.date}>{metadata.post.created_at.substring(0, 10)}</Text>
        </View>
        <View>
          <Text style={OncourtStyles.firstName}>{firstName}</Text>
          <Text style={OncourtStyles.lastName}>{lastName}</Text>
        </View>
      </Image>
    </View>
  )
};
//
// <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'oncourt', id: metadata.post.id, title: metadata.post.title})}>
//   <Image source={coverImgSrc} style={coverImage}/>
// </TouchableOpacity>
// <View style={contentContainer}>
//   <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'oncourt', id: metadata.post.id, title: metadata.post.title})}><Text style={titleText}>{metadata.post.title}</Text></TouchableOpacity>
//   <View style={subInfoContainer}>
//     <Text style={date}>{metadata.post.created_at.substring(0, 10)}</Text>
//     <Text style={rate}>{metadata.score.toFixed(1)}/5.0 <Image source={require('../../images/sneakerblack.png')} style={rateImage} /></Text>
//     <View style={divider}></View>
//   </View>
//   <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'oncourt', id: metadata.post.id, title: metadata.post.title})}><Text style={contentText}>{`${metadata.post.content[0].substring(0, 80)}...`}</Text></TouchableOpacity>
//   <TouchableOpacity onPress={() => navigation.navigate('Show', {postType: 'oncourt', id: metadata.post.id, title: metadata.post.title})}><Text style={more}>more</Text></TouchableOpacity>
// </View>
const OncourtStyles = StyleSheet.create({
  postContainer: {
    margin: 5,
    elevation: 1,
    borderWidth: 0,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    height: 300,
    position: 'relative'
  },
  coverImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  firstName: {
    color: 'white',
    fontSize: 26,
    fontWeight: '300'
  },
  lastName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 26
  },
  date: {
    color: 'white'
  }
})
const OncourtPostDetailWithNavigation = withNavigation(OncourtPostDetail);

export default OncourtPostDetailWithNavigation;