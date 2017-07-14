import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPostDetail from './post/calendarPostDetail';
import Swiper from 'react-native-swiper';

const BASE_REQUEST_URI = 'https://1211e58f.ngrok.io/api/v0/calendar_posts';
const calendarStyles = require('../styles/calendar.styles');
const width = Dimensions.get('window').width;
const currentDate = new Date();

export default class Calendar extends Component {  
  static navigationOptions = {
    headerTitle: 'Calendar'
  }

	constructor(props) {
    super(props);
    this.state = { isLoading: true, currentIndex: 3 };
  }

  buildMonthSwiper() {
    let allMonth = [];
    for (var i = -3; i <= 6; i++) {
      var copyDate = new Date(currentDate.getTime());
      copyDate.setMonth(currentDate.getMonth() + i);
      allMonth.push(new Date(copyDate));
    }

    let self = this;
    let months = allMonth.map(function (item, index) {
      return (
        <View style={calendarStyles.monthContainer} key={index}><Text style={(self.state.currentIndex === index) && calendarStyles.selectedMonth}>{item.toISOString().slice(0, 7)}</Text></View>
      );
    });

    let updateIndex = function(e, state) {
      this.setState({isLoading: false, currentIndex: state.index});
    }

    return (
      <View style={{alignItems: 'center'}}>
        <Swiper ref='monthSwiper' index={3} onMomentumScrollEnd={updateIndex.bind(this)} showsButtons={true} height={80} width={width*0.5} showsPagination={false} loop={false} bounces={true} style={calendarStyles.monthSwiper}
          nextButton={<Icon name="chevron-right" style={{color: '#999', fontSize: 18, fontWeight: '100'}} />}
          prevButton={<Icon name="chevron-left" style={{color: '#999', fontSize: 18, fontWeight: '100'}} />}
        >
          {months}
        </Swiper>
      </View>
    )
  }

	render() {
    let monthSwiper = this.buildMonthSwiper();

  	return (
  		<ScrollView>
  			{monthSwiper}
        <CalendarPostDetail />
        <CalendarPostDetail />
    	</ScrollView>
  	);
	}
}