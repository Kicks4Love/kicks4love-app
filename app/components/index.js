import React, { Component } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, ScrollView, FlatList } from 'react-native';
import IndexPostDetail from './post/indexPostDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import indexStyles from '../styles/index.styles';
import { logo } from '../styles/application.styles'

const BASE_REQUEST_URI = 'https://cb406d91.ngrok.io/api/v0/home_posts';

export default class Index extends Component {
	static navigationOptions = {
		headerTitle: <Image source={require('../images/nav_logo.png')} style={ logo } />
	};

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      noMore: false,
      moreIsLoading: false,
      sliderRecord: [], 
      postRecord: [],
      page: 0
   }
  }

  makeRemoteRequest = (chinese) => {
    let nextPage = this.state.page + 1;
    if (this.state.noMore || this.state.moreIsLoading) return null;
    if (nextPage > 1) this.state.moreIsLoading = true;
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;

    return fetch(request_uri)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState((prevState) => ({ 
          isLoading: false,
          moreIsLoading: false,
          postRecord: nextPage == 1 ? responseJson.posts : [...this.state.postRecord, ...responseJson.posts],
          page: nextPage,
          sliderRecord: nextPage == 1 ? responseJson.slider_posts : prevState.sliderRecord,
          noMore: responseJson.no_more
        }) );
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  componentDidMount() {
    return this.makeRemoteRequest(false);
  }

	buildPostSwiper() {
    let slider = this.state.sliderRecord.map(function (item) {
      return (
        <View key={item.post_type + '/' + item.post.id} style={indexStyles.slide}>
          <Image source={{uri: item.image_url}} style={indexStyles.slideImage}>
            <View style={indexStyles.slideImageInnerFrame}/>
          </Image>
          <Text style={indexStyles.slideText}>{item.post.title}</Text>
        </View>
      );
    });

		return (
      <View>
  			<Swiper showsButtons={true} autoplay={true} height={300} activeDotColor={'#fff'} paginationStyle={indexStyles.sliderPagination}
  				nextButton={<Icon name="chevron-right" style={{color: '#fff', fontSize: 28}} />}
  				prevButton={<Icon name="chevron-left" style={{color: '#fff', fontSize: 28}} />}
  			>
          {slider}
        </Swiper>
        <Text style={indexStyles.logan}><Icon name="check" /> Using Kicks4Love App, Better Experience</Text>
      </View>
		);
	}

  loadMoreIndicator = () => {
    if (this.state.noMore) return null;
    return (
      <View style={indexStyles.loadMore}>
        <ActivityIndicator animating={true}/>
      </View>
    );
  }

	render() {
    if (this.state.isLoading) {
      return (
        <View style={indexStyles.container}>
          <ActivityIndicator animating={true} size="large" style={indexStyles.loader} />
        </View>
      );
    }

		let postSwiper = this.buildPostSwiper();

	  return (
      <FlatList
        data={this.state.postRecord}
        renderItem={ ({ item }) => <IndexPostDetail metadata={item} /> }
        ListHeaderComponent={postSwiper}
        onEndReached={ () => this.makeRemoteRequest(false) }
        onEndReachedThreshold={0}
        ListFooterComponent={this.loadMoreIndicator}
        keyExtractor={item => item.post_type + '/' + item.post.id}
      />
	  );
	}
}