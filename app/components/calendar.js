import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPostDetail from './post/calendarPostDetail';
import Swiper from 'react-native-swiper';

import calendarStyles from '../styles/calendar.styles';

const BASE_REQUEST_URI = 'https://cb406d91.ngrok.io/api/v0/calendar_posts';
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

    this.state = {
      isLoading: true,
      currentMonthIndex: 3,
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
    let lang = chinese ? 'cn' : 'en';
    let selectedMonth = this.state.months[this.state.currentMonthIndex];
    let request_uri = `${BASE_REQUEST_URI}?year=${selectedMonth.getFullYear()}&month=${selectedMonth.getMonth() + 1}&l=${lang}`;
    return fetch(request_uri)
      .then(response => response.json())
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
        this.setState({
          posts: newPosts,
          isLoading: false
        });
      });
  }

  buildMonthSwiper() {
    let self = this;
    let months = this.state.months.map(function (item, index) {
      return (
        <View style={calendarStyles.monthContainer} key={index}><Text style={(self.state.currentMonthIndex === index) && calendarStyles.selectedMonth}>{item.toISOString().slice(0, 7)}</Text></View>
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
        <View>
          {monthSwiper}
          <ActivityIndicator animating={true} size="large"/>
        </View>
      );
    } else if (this.state.posts.length < 1) {
      content = (
        <View>
          {monthSwiper}
          <Text style={calendarStyles.noData}>No release this month</Text>
        </View>
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
          />
        )
      }
    }

  	return content;
	}
} 