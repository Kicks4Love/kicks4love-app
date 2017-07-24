import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, View, FlatList } from 'react-native';
import RumorPostDetail from './post/rumorPostDetail';
import Loader from './loader';
import { container, flatList } from '../styles/rumor.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/rumor_posts`;

export default class Index extends Component {
	static navigationOptions = {
    	headerTitle: 'Rumor'
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
	    let lang = chinese ? 'cn' : 'en';
	    let requestUri = `${BASE_REQUEST_URI}?next_page=${nextPage}&l=${lang}`;

	    return fetch(requestUri)
	      	.then((response) => response.json())
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

  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return <Loader type='more' text='Loading more Rumor posts...' />;
	}

  	render() {
	  	let content;
		if (this.state.isLoading)
  			content = <Loader type='initial' />;
		else {
  			if (this.state.hasError)
    			content = <View style={container}><Text>An error occured</Text></View>;
  			else {
    			content = (
      				<FlatList
			            data={this.state.rumorPosts}
			            keyExtractor={item => item.post.id}
			            extraData={this.state}
			            renderItem={ ({ item }) => <RumorPostDetail metadata={item} /> }
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