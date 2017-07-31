import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import CalendarPostDetail from './post/calendarPostDetail';
import Loader from './loader';

import calendarStyles from '../styles/calendar.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/calendar_posts`;
const WIDTH = Dimensions.get('window').width;
const CURRENT_DATE = new Date();

export default class Calendar extends Component {
  static navigationOptions = {
    headerTitle: 'Calendar'
  }

	constructor(props) {
    super(props);

    let allMonth = [];
    for (var i = -3; i <= 6; i++) {
      var copyDate = new Date(CURRENT_DATE.getTime());
      copyDate.setMonth(CURRENT_DATE.getMonth() + i);
      allMonth.push(new Date(copyDate));
    }

    let currentIndex;
    if (this.props.navigation.state.params && this.props.navigation.state.params.date) {
      var date = this.props.navigation.state.params.date;
      currentIndex = allMonth.findIndex(function(d) {
        return (d.getFullYear() + '_' + d.getMonth()) == (date.getFullYear() + '_' + date.getMonth());
      });
      if (currentIndex < 0) currentIndex = 3;
    }

    this.state = {
      isLoading: true,
      currentMonthIndex: currentIndex || 3,
      currentPostIndex: 3,
      hasError: false,
      months: allMonth,
      posts: []
    }
  }

  componentDidMount() {
    return this.requestData(false);
  }

  requestData(chinese) {
    let lang = chinese ? 'zh' : 'en';
    let selectedMonth = this.state.months[this.state.currentMonthIndex];
    let request_uri = `${BASE_REQUEST_URI}?year=${selectedMonth.getFullYear()}&month=${selectedMonth.getMonth() + 1}&l=${lang}`;
    let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

    return fetch(request_uri, authConfig)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error(`Unsuccessful response with status: ${response.status}`);
      })
      .then(responseJson => {
        let newPosts = [];
        responseJson.posts.forEach(function(data) {
          newPosts.push({
            id: data.post.id,
            title: data.post.title,
            date: new Date(data.post.release_date),
            price: data.post.price,
            image: data.image_url
          });
        });
        newPosts.sort(function(a,b) { return a.date - b.date; });
        this.setState({ posts: newPosts, isLoading: false });
      }).catch((error) => {
        Alert.alert(error.message);
      });
  }

  buildMonthSwiper() {
    let self = this;
    let months = this.state.months.map(function (item, index) {
      return (
        <View style={calendarStyles.monthContainer} key={index}><Text style={[calendarStyles.textColor, (self.state.currentMonthIndex === index) && calendarStyles.selectedMonth]}>{item.toISOString().slice(0, 7)}</Text></View>
      );
    });

    let updateIndex = function(e, state) {
      this.setState({
        isLoading: true,
        hasError: false,
        currentPostIndex: 3,
        posts: []
      });
      this.state.currentMonthIndex = state.index;
      this.requestData(false);
    }

    return (
      <View style={calendarStyles.monthSwiperContainer}>
        <Swiper ref='monthSwiper' index={this.state.currentMonthIndex} onMomentumScrollEnd={updateIndex.bind(this)} showsButtons={true} height={80} width={WIDTH*0.5} showsPagination={false} loop={false} bounces={true} style={calendarStyles.monthSwiper}
          nextButton={<Icon name="chevron-right" style={calendarStyles.monthSwiperButton} />}
          prevButton={<Icon name="chevron-left" style={calendarStyles.monthSwiperButton} />}
        >
          {months}
        </Swiper>
      </View>
    )
  }

  updatePostIndex() {
    if (this.isLoading) return null;
    if (this.state.currentPostIndex >= this.state.posts.length) return null;
    this.setState({currentPostIndex: this.state.currentPostIndex + 3});
  }

	render() {
    let monthSwiper = this.buildMonthSwiper();
    let content;
    if (this.state.isLoading) {
      content = (
        <ScrollView style={[calendarStyles.fullBackground, calendarStyles.whiteBackground]}>
          {monthSwiper}
          <Loader type='initial' />
        </ScrollView>
      );
    } else if (this.state.posts.length < 1) {
      content = (
        <ScrollView style={[calendarStyles.fullBackground, calendarStyles.whiteBackground]}>
          {monthSwiper}
          <Text style={[calendarStyles.textColor, calendarStyles.noData]}>No release this month</Text>
        </ScrollView>
      );
    } else {
      if (this.state.hasError)
        content = <Text>An error occured</Text>
      else {
        content = (
          <FlatList
            data={this.state.posts.slice(0, this.state.currentPostIndex)}
            keyExtractor={item => item.id}
            extraData={this.state}
            ListHeaderComponent={monthSwiper}
            onEndReached={ () => this.updatePostIndex() }
            onEndReachedThreshold={0}
            renderItem={ ({ item }) => <CalendarPostDetail metadata={item} /> }
            style={calendarStyles.whiteBackground}
          />
        )
      }
    }

  	return content;
	}
}