import React, { Component } from 'react';
import { ActivityIndicator, Alert,Text, View, FlatList } from 'react-native';
import TrendPostDetail from './post/trendPostDetail';
import IndexPostDetail from './post/indexPostDetail';
import FeaturePostDetail from './post/featurePostDetail';
import indexStyles from '../styles/index.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/trend_posts`;

export default class Index extends Component {
	static navigationOptions = {
    	headerTitle: 'Trend'
  	}

	constructor(props) {
     	super(props);
     	this.state = {
	      isLoading: true,
	      nextPage: 0,
	      noMore: false,
	      moreIsLoading: false,
	      trendPosts: []
    	}
  	}

  	componentDidMount() {
    	return this.requestData(true);
  	}

  	requestData(chinese) {
	    let nextPage = this.state.nextPage + 1;
	    if (this.state.noMore || this.state.moreIsLoading) return null;
	    if (nextPage > 1) this.state.moreIsLoading = true;
	    let lang = chinese ? 'cn' : 'en';
	    let request_uri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;

	    return fetch(request_uri)
	      .then((response) => response.json())
	      .then((responseJson) => {
	      	console.log(responseJson.posts);
	        this.setState(() => ({ 
	          isLoading: false,
	          moreIsLoading: false,
	          trendPosts: nextPage == 1 ? responseJson.posts : [...this.state.trendPosts, ...responseJson.posts],
	          nextPage: nextPage,
	          noMore: responseJson.no_more
	        }) );
	      })
	      .catch((error) => {
	        Alert.alert(error.message);
	      });
	 }


  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return (
	      <View style={loadMore}>
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

	  return (
	      <FlatList
	        data={this.state.trendPosts}
	        renderItem={ ({ item }) => <TrendPostDetail metadata={item} /> }
	        onEndReached={ () => this.requestData(false) }
	        onEndReachedThreshold={0}
	        ListFooterComponent={this.loadMoreIndicator}
	        keyExtractor={item => item.post_type + '/' + item.post.id}
	      />
	  );
  }
}