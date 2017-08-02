import React from 'react';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { withNavigation } from 'react-navigation';
import ImageProgress from 'react-native-image-progress';
import Loader from '../other/loader';
import Icon from 'react-native-vector-icons/FontAwesome';

import { postContainer, postBackgroundImage, textColor, titleContainer, title, description, infoContainer, rating, ratingImage, date, arrowLink } from '../../styles/streetsnap.styles';

class StreetSnapPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hide: true, animation: new Animated.Value(-115) };
  }

  toggle() {
    let initialValue = this.state.hide ? -115: 0,
        finalValue = this.state.hide ? 0 : -115;

    this.setState({ hide: !this.state.hide });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, { toValue: finalValue }).start();
  }

  render() {
    return (
      <View style={postContainer}>
        <TouchableWithoutFeedback onPress={this.toggle.bind(this)}>
          <Image source={{uri: this.props.metadata.image_url}} style={postBackgroundImage}>
            <View style={titleContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Show', {postType: 'streetsnap', id: this.props.metadata.post.id, title: this.props.metadata.post.title})}>
                <Text style={[textColor, title]}>{this.props.metadata.post.title.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={this.toggle.bind(this)}>
              <Animated.View style={[description, { bottom: this.state.animation }]}>
                <View style={infoContainer}>
                  <View style={rating}>
                    <Image source={Math.round(this.props.metadata.score) >= 1 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                    <Image source={Math.round(this.props.metadata.score) >= 2 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                    <Image source={Math.round(this.props.metadata.score) >= 3 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                    <Image source={Math.round(this.props.metadata.score) >= 4 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                    <Image source={Math.round(this.props.metadata.score) == 5 ? require('../../images/sneakerblack.png') : require('../../images/sneakergray.png')} style={ratingImage} />
                  </View>
                  <Text style={date}>{this.props.metadata.post.created_at.slice(0, 10)}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Show', {postType: 'streetsnap', id: this.props.metadata.post.id, title: this.props.metadata.post.title})}>
                  <Text style={textColor}>{this.props.metadata.post.content[0].replace(/<(?:.|\n)*?>/gm, '').substring(0, 110)}...</Text>
                  <Icon name='arrow-right' size={20} color='#333' style={arrowLink} />
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const StreetSnapPostDetailWithNavigation = withNavigation(StreetSnapPostDetail);

export default StreetSnapPostDetailWithNavigation;