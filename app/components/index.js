import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, View, Text, ScrollView, FlatList } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageProgress from 'react-native-image-progress';
import Swiper from 'react-native-swiper';
import IndexPostDetail from './post/indexPostDetail';
import Loader from './loader';

import indexStyles from '../styles/index.styles';
import { logo } from '../styles/application.styles'

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/home_posts`;

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
  }

  loadMoreIndicator = () => {
    let shouldShow = this.state.moreIsLoading && !this.state.no_more;
    if (shouldShow) {
      return (
        <View 
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }}
        >
          <ActivityIndicator animating={true}/>
        </View>
      );
    }
    else return null;
  }

  componentDidMount() {
    return this.makeRemoteRequest(false);
  }

	buildPostSwiper() {
    let self = this;
    let slider = this.state.sliderRecord.map(function (item) {
      return (
        <TouchableOpacity key={item.post.pointer_type + '/' + item.post.pointer_id} style={indexStyles.slide} onPress={() => self.props.navigation.navigate('Show', {postType: item.post.pointer_type, id: item.post.pointer_id, title: item.post.title})}>
            <ImageProgress source={{uri: item.image_url}} style={indexStyles.slideImage}>
              <View style={indexStyles.slideImageInnerFrame}/>
            </ImageProgress>
            <Text style={indexStyles.slideText}>{item.post.title}</Text>
        </TouchableOpacity>
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
    return <Loader type='more' text='Loading more latest posts...' />;
  }

	render() {
    if (this.state.isLoading)
      return <Loader type='initial' />;

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
        style={indexStyles.list}
      />
	  );
	}
}