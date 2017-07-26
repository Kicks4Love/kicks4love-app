import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, View, FlatList } from 'react-native';
import TrendPostDetail from './post/trendPostDetail';
import Loader from './loader';

import { container, flatList } from '../styles/trend.styles';

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
    	return this.requestData(false);
  	}

  	requestData(chinese) {
  		if (this.state.noMore || this.state.moreIsLoading) return null;

	    let nextPage = this.state.nextPage + 1;
	    if (nextPage > 1) this.state.moreIsLoading = true;
	    let lang = chinese ? 'cn' : 'en';
	    let requestUri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;

	    return fetch(requestUri)
	      	.then((response) => response.json())
	      	.then((responseJson) => {
	        	this.setState(() => ({ 
		          	isLoading: false,
		          	moreIsLoading: false,
		          	trendPosts: nextPage == 1 ? responseJson.posts : [...this.state.trendPosts, ...responseJson.posts],
		          	nextPage: nextPage,
		          	noMore: responseJson.no_more
	        	}));
	      	})
	      	.catch((error) => {
	        	Alert.alert(error.message);
	      	});
	}

  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return <Loader type='more' text='Loading more Trend posts...' />;
	}

  	render() {
	  	let content;
		if (this.state.isLoading)
  			content = <Loader type='initial' />;
		else {
			content = (
  				<FlatList
		            data={this.state.trendPosts}
		            keyExtractor={item => item.post.id}
		            extraData={this.state}
		            renderItem={ ({ item }) => <TrendPostDetail metadata={item} /> }
		            onEndReached={ () => this.requestData(false) }
		            onEndReachedThreshold={0}
		            ListFooterComponent={this.loadMoreIndicator}
		            style={flatList}/>
			);
		}

	  	return content;
  	}
}