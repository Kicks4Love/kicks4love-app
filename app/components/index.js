import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, View, Text, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import IndexPostDetail from './post/indexPostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

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
    };
    gaTracker.trackScreenView('Home');
  }

  makeRemoteRequest = () => {
    if (this.state.noMore || this.state.moreIsLoading) return null;

    let nextPage = this.state.page + 1;
    if (nextPage > 1) this.state.moreIsLoading = true;
    let lang = I18n.locale.substr(0, 2);
    let request_uri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;
		let auth_config = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

    return fetch(request_uri, auth_config)
      .then((response) => {
				if (response.ok) return response.json()
	      throw new Error(`Unsuccessful response with status: ${response.status}`);
			})
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

  componentDidMount() {
    return this.makeRemoteRequest();
  }

	buildPostSwiper() {
    let self = this;
    let slider = this.state.sliderRecord.map(function (item) {
      return (
        <TouchableOpacity key={item.post.pointer_type + '/' + item.post.pointer_id} style={indexStyles.slide} onPress={() => self.props.navigation.navigate('Show', {postType: item.post.pointer_type.toLowerCase(), id: item.post.pointer_id, title: item.post.title})}>
            <Image source={{uri: item.image_url}} style={indexStyles.slideImage}>
              <View style={indexStyles.slideImageInnerFrame}/>
            </Image>
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
        <Text style={indexStyles.logan}><Icon name="check" />{I18n.t('sillyBanner')}</Text>
      </View>
		);
	}

  loadMoreIndicator = () => {
    if (this.state.noMore) return null;
    return <Loader type='more' text={I18n.t('loadMoreIndicatorText')} />;
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
        onEndReached={ () => this.makeRemoteRequest() }
        onEndReachedThreshold={0}
        ListFooterComponent={this.loadMoreIndicator}
        keyExtractor={item => item.post_type + '/' + item.post.id}
        style={indexStyles.list}
      />
	  );
	}
}
