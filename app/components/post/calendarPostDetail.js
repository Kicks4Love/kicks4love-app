import React, {Component} from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import ImageProgress from 'react-native-image-progress';

import moment from 'moment';

import calendarStyles from '../../styles/calendar.styles';

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

  formatNumber(number) {
    if (number < 10) return '0' + number;
    return number;
  }

  render() {
    let priceStr = this.props.metadata.price <= 0 ? 'N/A' : parseFloat(this.props.metadata.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '1,');

    return (
      <View style={calendarStyles.container}>
        <TouchableHighlight onPress={this.toggleCover.bind(this)}>
          <ImageProgress source={{uri: this.props.metadata.image}} style={calendarStyles.coverImage}>
            <View style={[calendarStyles.cover, !this.state.pressed && calendarStyles.coverRemoved]}>
              <Text style={[calendarStyles.coverTitle, !this.state.pressed && calendarStyles.coverRemoved]}>{this.props.metadata.title}</Text>
              <Text style={[calendarStyles.coverPrice, !this.state.pressed && calendarStyles.coverRemoved]}>$ {priceStr}</Text>
            </View>
          </ImageProgress>
        </TouchableHighlight>
        <Text style={[calendarStyles.textColor, calendarStyles.date]}>{new moment(this.props.metadata.date).format('MM/DD')}</Text>
      </View>
    )
  }
}

export default CalendarPostDetail;