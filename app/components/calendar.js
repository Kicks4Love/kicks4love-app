import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import CalendarPostDetail from './post/calendarPostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import moment from 'moment';

import calendarStyles from '../styles/calendar.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/calendar_posts`;
const WIDTH = Dimensions.get('window').width;
const CURRENT_DATE = new moment();

export default class Calendar extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.title
  })

	constructor(props) {
    super(props);

    let allMonth = [];
    for (var i = -3; i <= 6; i++) {
      var copyDate = CURRENT_DATE.clone().add(i, 'months');
      allMonth.push(copyDate);
    }

    let currentIndex;
    if (this.props.navigation.state.params && this.props.navigation.state.params.date) {
      var date = new moment(this.props.navigation.state.params.date);
      currentIndex = allMonth.findIndex(function(d) {
        return (d.year() + '_' + d.month()) == (date.year() + '_' + date.month());
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
    };

    gaTracker.trackScreenView('Calendar');
  }

  componentDidMount() {
    return this.requestData();
  }

  requestData() {
    let lang = this.props.navigation.state.params.lang;
    let selectedMonth = this.state.months[this.state.currentMonthIndex];
    let request_uri = `${BASE_REQUEST_URI}?year=${selectedMonth.year()}&month=${selectedMonth.month() + 1}&l=${lang}`;
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
        <View style={calendarStyles.monthContainer} key={index}><Text style={[calendarStyles.textColor, (self.state.currentMonthIndex === index) && calendarStyles.selectedMonth]}>{item.format('YYYY-MM')}</Text></View>
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
      this.requestData();
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
          <Text style={[calendarStyles.textColor, calendarStyles.noData]}>{I18n.t("noRelease")}</Text>
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
