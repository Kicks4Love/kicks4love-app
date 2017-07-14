import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPostDetail from './post/calendarPostDetail';
import Swiper from 'react-native-swiper';

const BASE_REQUEST_URI = 'https://cb406d91.ngrok.io/api/v0/calendar_posts';
const calendarStyles = require('../styles/calendar.styles');
const width = Dimensions.get('window').width;
const currentDate = new Date();

export default class Calendar extends Component {  
  static navigationOptions = {
    headerTitle: 'Calendar'
  }

	constructor(props) {
    super(props);

    let allMonth = [];
    for (var i = -3; i <= 6; i++) {
      var copyDate = new Date(currentDate.getTime());
      copyDate.setMonth(currentDate.getMonth() + i);
      allMonth.push(new Date(copyDate));
    }

    this.state = {
      isLoading: true,
      currentIndex: 3,
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
    let selectedMonth = this.state.months[this.state.currentIndex];
    let request_uri = `${BASE_REQUEST_URI}?year=${selectedMonth.getFullYear()}&month=${selectedMonth.getMonth() + 1}&l=${lang}`;
    console.log(request_uri);
    return fetch(request_uri)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
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
        <View style={calendarStyles.monthContainer} key={index}><Text style={(self.state.currentIndex === index) && calendarStyles.selectedMonth}>{item.toISOString().slice(0, 7)}</Text></View>
      );
    });

    let updateIndex = function(e, state) {
      console.log(state.index);
      this.setState({
        isLoading: true,
        hasError: false,
        currentIndex: state.index,
        posts: []
      });
      console.log(this.state.currentIndex);
      this.requestData(false);
    }

    return (
      <View style={calendarStyles.monthSwiperContainer}>
        <Swiper ref='monthSwiper' index={3} onMomentumScrollEnd={updateIndex.bind(this)} showsButtons={true} height={80} width={width*0.5} showsPagination={false} loop={false} bounces={true} style={calendarStyles.monthSwiper}
          nextButton={<Icon name="chevron-right" style={calendarStyles.monthSwiperButton} />}
          prevButton={<Icon name="chevron-left" style={calendarStyles.monthSwiperButton} />}
        >
          {months}
        </Swiper>
      </View>
    )
  }

	render() {
    let monthSwiper = this.buildMonthSwiper();
    let content;
    if (this.state.isLoading) {
      content = (
        <ActivityIndicator animating={true} size="large"/>
      );
    } else {
      if (this.state.hasError)
        content = <Text>An error occured</Text>
      else {
        content = (
          <FlatList
            data={this.state.posts}
            keyExtractor={item => item.id}
            extraData={this.state}
            renderItem={ ({ item }) => <CalendarPostDetail metadata={item} /> }
          />
        )
      }
    }

  	return (
  		<ScrollView>
  			{monthSwiper}
        {content}
    	</ScrollView>
  	);
	}
}