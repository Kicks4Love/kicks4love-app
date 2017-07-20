import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, View, FlatList } from 'react-native';
import TrendPostDetail from './post/trendPostDetail';

import { container, loadMore, loadMoreText, flatList } from '../styles/trend.styles';

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
	    return (
	      <View style={loadMore}>
	        <ActivityIndicator animating={true}/>
	        <Text style={loadMoreText}>Loading more Trend posts...</Text>
	      </View>
	    );
	}

  	render() {
	  	let content;
		if (this.state.isLoading) {
  			content = <View style={container}><ActivityIndicator animating={true} size="large" /></View>;
		} else {
  			if (this.state.hasError)
    			content = <View style={container}><Text>An error occured</Text></View>;
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
		}

	  	return content;
  	}
}