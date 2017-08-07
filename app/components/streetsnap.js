import React, { Component } from 'react';
import { Alert, Text, View, FlatList, ScrollView } from 'react-native';
import StreetSnapPostDetail from './post/streetsnapPostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import streetsnapStyles from '../styles/streetsnap.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/streetsnap_posts`;

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
	      	streetsnapPosts: []
    	};
    	gaTracker.trackScreenView('StreetSnap');
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
	      	.then((response) => response.json())
	      	.then((responseJson) => {
	        	this.setState(() => ({
		          	isLoading: false,
		          	moreIsLoading: false,
		          	streetsnapPosts: nextPage == 1 ? responseJson.posts : [...this.state.streetsnapPosts, ...responseJson.posts],
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
	    	<View style={[streetsnapStyles.marginContent, streetsnapStyles.header]}>
	    		<Text style={streetsnapStyles.headerTitle}>{I18n.t("streetsnapBanner")}</Text>
	    	</View>
	    );
	}

  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return <Loader type='more' text={I18n.t('loadMoreIndicatorText')} />;
	}

  	render() {
	  	let header = this.buildHeader();
	  	let content;

		if (this.state.isLoading) {
  			content = (
  				<ScrollView style={[streetsnapStyles.fullBackground, streetsnapStyles.whiteBackground]}>
          			{header}
          			<Loader type='initial' />
        		</ScrollView>
        	);
		} else {
    		content = (
  				<FlatList
		            data={this.state.streetsnapPosts}
		            keyExtractor={item => item.post.id}
		            extraData={this.state}
		            ListHeaderComponent={header}
		            renderItem={ ({ item }) => <StreetSnapPostDetail metadata={item} /> }
		            onEndReached={ () => this.requestData() }
		            onEndReachedThreshold={0}
		            ListFooterComponent={this.loadMoreIndicator}
		            style={streetsnapStyles.whiteBackground}/>
			);
  		}

	  	return content;
  	}
}