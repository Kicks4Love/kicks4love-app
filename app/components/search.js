import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text, FlatList, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import SearchPostDetail from './post/searchPostDetail';
import searchStyles from '../styles/search.styles';
import { headerLeft } from '../styles/application.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/search`;

export default class Index extends Component {
	static navigationOptions = ({navigation}) => ({
  		title: navigation.state.params.title,
  		headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="chevron-left" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerRight: null
	});

	constructor(props) {
	    super(props);
	    this.state = {
		    isLoading: false,
		    nextPage: 0,
		    noMore: false,
		    query: null,
		    prevQuery: null,
		    moreIsLoading: false,
		    searchResult: []
	    };
  	}

  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    	return <Loader type='more' text={I18n.t('search.loadMoreSearch')} />;
  	}

  	requestData(initial) {
  		if (this.state.isLoading) return null;

  		let inputQuery = this.state.query || '*';

  		if (initial) {
  			if (this.state.prevQuery == inputQuery) return null;
  			this.setState({isLoading: true, searchResult: []});
  			this.state.nextPage = 0; // move out of setState to have immediate change effect
  		} else if (this.state.noMore || this.state.moreIsLoading)
  			return null;

  		let lang = this.props.navigation.state.params.lang;
  		let newNextPage = this.state.nextPage + 1;

  		if (newNextPage > 1) this.state.moreIsLoading = true;
      	let requestUri = `${BASE_REQUEST_URI}?q=${encodeURIComponent(inputQuery)}&page=${newNextPage}&l=${lang}`;
			let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

      	return fetch(requestUri, authConfig)
	    	.then(response => {
	      		if (response.ok) return response.json()
	      		throw new Error(`Unsuccessful response with status: ${response.status}`);
	    	}).then(responseJson => {
	      		this.setState( (prevState) => ({
		      		prevQuery: inputQuery,
		        	searchResult: prevState.searchResult.concat(responseJson.results),
		        	nextPage: newNextPage,
		        	isLoading: false,
		        	moreIsLoading: false,
		      		noMore: responseJson.no_more
	      		}));
	    	})
	    	.catch((error) => {
        		Alert.alert(error.message);
      		});
  	}

	render() {
		let content;
		if (this.state.isLoading)
			content = <Loader type='initial' />;
		else if (this.state.searchResult.length > 0) {
			content = (
				<FlatList
			        data={this.state.searchResult}
			        renderItem={ ({ item }) => <SearchPostDetail metadata={item} /> }
			        keyExtractor={ item => item.post_type + '/' + item.post.id }
			        onEndReached={ () => this.requestData(false) }
			        onEndReachedThreshold={0.5}
			        ListFooterComponent={this.loadMoreIndicator}
			    />
			);
		} else
			content = <Text style={[searchStyles.textColor, searchStyles.text]}>{I18n.t('search.searchEmptyText')}</Text>;

		return (
	      	<View style={searchStyles.container}>
	      		<View style={searchStyles.searchBar}>
	      			<Icon style={searchStyles.searchIcon} name="search" size={20} color="#777" />
		      	 	<TextInput
				        style={searchStyles.searchInput}
				        onChangeText={(text) => this.state.query = text}
				        onSubmitEditing={() => this.requestData(true)}
				        placeholder={I18n.t('search.searchPrompt')}
								underlineColorAndroid='transparent'
				    />
				</View>
		     	{content}
		  	</View>
	    );
	}
}