import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, View, FlatList } from 'react-native';
import TrendPostDetail from './post/trendPostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import { flatList } from '../styles/trend.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/trend_posts`;

export default class Index extends Component {
	static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.title
  })

	constructor(props) {
     	super(props);
     	this.state = {
	      isLoading: true,
	      nextPage: 0,
	      noMore: false,
	      moreIsLoading: false,
	      trendPosts: []
    	};
    	gaTracker.trackScreenView('Trend');
  	}

  	componentDidMount() {
    	return this.requestData();
  	}

  	requestData() {
  		if (this.state.noMore || this.state.moreIsLoading) return null;

	    let nextPage = this.state.nextPage + 1;
	    if (nextPage > 1) this.state.moreIsLoading = true;
	    let lang = this.props.navigation.state.params.lang;
	    let requestUri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;
			let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

	    return fetch(requestUri, authConfig)
	      	.then((response) => {
				if (response.ok) return response.json()
			    throw new Error(`Unsuccessful response with status: ${response.status}`);
			})
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
	    return <Loader type='more' text={I18n.t('loadMoreIndicatorText')} />;
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
		            onEndReached={ () => this.requestData() }
		            onEndReachedThreshold={0.5}
		            ListFooterComponent={this.loadMoreIndicator}
		            style={flatList}/>
			);
		}

	  	return content;
  	}
}