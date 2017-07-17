import React, { Component } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, ScrollView, FlatList,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import indexStyles from '../styles/index.styles';
import { logo } from '../styles/application.styles'

const BASE_REQUEST_URI = 'https://2e3dbc06.ngrok.io/api/v0/home_posts';
const width = Dimensions.get('window').width;

export default class Index extends Component {
	static navigationOptions = {
		headerTitle: <Image source={require('../images/nav_logo.png')} style={ logo } />
	};

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      no_more: false,
      moreIsLoading: false,
      sliderRecord: [], 
      postRecord: [],
      page: 0
   }
  }

  makeRemoteRequest = (chinese) => {
    let next_page = this.state.page + 1;
    if (this.state.no_more || this.state.moreIsLoading) return null;
    if (next_page > 1) this.state.moreIsLoading = true;
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${next_page}&l=${lang}`;

    return fetch(request_uri)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState((prevState) => ({ 
          isLoading: false,
          moreIsLoading: false,
          postRecord: next_page == 1 ? responseJson.posts : [...this.state.postRecord, ...responseJson.posts],
          page: next_page,
          sliderRecord: next_page == 1 ? responseJson.slider_posts : prevState.sliderRecord,
          no_more: responseJson.no_more
        }) );
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  componentDidMount() {
    return this.makeRemoteRequest(true);
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
    if (this.state.no_more) return null;
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

		let content = this.buildPostSwiper();

	  return (
      <FlatList
        data={this.state.postRecord}
        renderItem={({item}) => (
          <View style={indexStyles.box}>
            <Image source={{uri: item.image_url, width: width * 0.4, height: 100}} style={indexStyles.coverImage} />
            <View style={indexStyles.boxContent}>
              <Text style={indexStyles.boxTitle}>{item.post.title} <Text style={indexStyles.boxDate}>{item.post.created_at.slice(0, 10)}</Text></Text>
              <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{item.post_type}</Text></Text>
              <Text style={indexStyles.boxRate}>{item.score}/5.0 <Image source={require('../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
            </View>
          </View>
        )}
        ListHeaderComponent={content}
        onEndReached={ () => this.makeRemoteRequest(true) }
        onEndReachedThreshold={0}
        ListFooterComponent={this.loadMoreIndicator}
        keyExtractor={item => item.post_type + '/' + item.post.id}
      />
	  );
	}
}