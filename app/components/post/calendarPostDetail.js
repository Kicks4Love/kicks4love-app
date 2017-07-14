import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';

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
    console.log(this.props.metadata.date);
    let priceStr = this.props.metadata.price <= 0 ? 'N/A' : parseFloat(this.props.metadata.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '1,');

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.toggleCover.bind(this)}>
          <Image source={{uri: this.props.metadata.image}} style={styles.coverImage}>
            <View style={[styles.cover, !this.state.pressed && styles.coverRemoved]}>
              <Text style={[styles.coverTitle, !this.state.pressed && styles.coverRemoved]}>{this.props.metadata.title}</Text>
              <Text style={[styles.coverPrice, !this.state.pressed && styles.coverRemoved]}>$ {priceStr}</Text>
            </View>
          </Image>
        </TouchableHighlight>
        <Text style={styles.date}>{(this.props.metadata.date.getMonth() + 1 < 10 ? '0' + (this.props.metadata.date.getMonth() + 1) : (this.props.metadata.date.getMonth() + 1)) + '/' + this.props.metadata.date.getDate()}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, .8)',
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

export default CalendarPostDetail;