import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, Animated, TouchableHighlight } from 'react-native';

class CalendarPostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false };
  }

  toggleCover() {
    this.setState(previousState => {
      return { pressed: !previousState.pressed };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.toggleCover.bind(this)}>
          <Image source={{uri: 'https://kicks4love.com/uploads/feature_post/14/feature1.jpg'}} style={styles.coverImage}>
            <Animated.View style={[styles.cover, !this.state.pressed && styles.coverRemoved]}>
              <Text style={[styles.coverTitle, !this.state.pressed && styles.coverRemoved]}>Air Jordan 5 "Red Suede"</Text>
              <Text style={[styles.coverPrice, !this.state.pressed && styles.coverRemoved]}>$ 190.00</Text>
            </Animated.View>
          </Image>
        </TouchableHighlight>
        <Text style={styles.date}>07/01</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1,
    height: 220,
    width: null
  },
  cover: {
    backgroundColor: 'rgba(255, 255, 255, .7)',
    flex: 1,
    padding: 15
  },
  coverRemoved: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    height: 0,
    borderWidth: 0
  },
  coverTitle: {
    padding: 5,
    fontWeight: 'bold',
    marginTop: 35,
    borderWidth: 2,
    fontSize: 22,
    textAlign: 'center'
  },
  coverPrice: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontSize: 18
  },
  date: {
    textAlign: 'center',
    marginTop: 5
  }
});

const {
  coverImage,
  cover
} = styles;

export default CalendarPostDetail;