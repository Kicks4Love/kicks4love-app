import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, View, ScrollView, FlatList } from 'react-native';
import RumorPostDetail from './post/rumorPostDetail';
import Loader from './other/loader';

import rumorStyles from '../styles/rumor.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/rumor_posts`;

export default class Index extends Component {
	static navigationOptions = {
    	headerTitle: 'Rumors'
  	}

	constructor(props) {
     	super(props);
     	this.state = {
	      isLoading: true,
	      nextPage: 0,
	      noMore: false,
	      moreIsLoading: false,
	      rumorPosts: []
    	}
  	}

  	componentDidMount() {
    	return this.requestData(false);
  	}

  	requestData(chinese) {
  		if (this.state.noMore || this.state.moreIsLoading) return null;

	    let nextPage = this.state.nextPage + 1;
	    if (nextPage > 1) this.state.moreIsLoading = true;
	    let lang = chinese ? 'zh' : 'en';
	    let requestUri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;
		let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };
		
	    return fetch(requestUri, authConfig)
	      	.then((response) => {
						if (response.ok) return response.json()
			      throw new Error(`Unsuccessful response with status: ${response.status}`);
					})
	      	.then((responseJson) => {
	      		console.log(responseJson.posts);
	        	this.setState(() => ({
		          	isLoading: false,
		          	moreIsLoading: false,
		          	rumorPosts: nextPage == 1 ? responseJson.posts : [...this.state.rumorPosts, ...responseJson.posts],
		          	nextPage: nextPage,
		          	noMore: responseJson.no_more
	        	}));
	      	})
	      	.catch((error) => {
	        	Alert.alert(error.message);
	      	});
	}

	buildHeader() {
	    return (
	    	<View style={[rumorStyles.marginContent, rumorStyles.header]}>
	    		<Text style={rumorStyles.headerTitle}>COMPREHENSIVE RUMOR, ALL IN ONE VIEW</Text>
	    	</View>
	    );
	}

  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return <Loader type='more' text='Loading more Rumor posts...' />;
	}

  	render() {
	  	let header = this.buildHeader();
	  	let content;

		if (this.state.isLoading) {
  			content = (
  				<ScrollView style={[rumorStyles.fullBackground, rumorStyles.whiteBackground]}>
          			{header}
          			<Loader type='initial' />
        		</ScrollView>
        	);
		} else {
			content = (
  				<FlatList
		            data={this.state.rumorPosts}
		            keyExtractor={item => item.post.id}
		            extraData={this.state}
		            ListHeaderComponent={header}
		            renderItem={ ({ item }) => <RumorPostDetail metadata={item} /> }
		            onEndReached={ () => this.requestData(false) }
		            onEndReachedThreshold={0}
		            ListFooterComponent={this.loadMoreIndicator}
		            style={rumorStyles.whiteBackground}/>
			);
		}

	  	return content;
  	}
}
