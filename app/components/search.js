import React, { Component } from 'react';
import { ActivityIndicator, Alert,Text,FlatList, View,TouchableOpacity,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { headerLeft, headerRight } from '../styles/application.styles';
import SearchPostDetail from './post/searchPostDetail';

import searchStyles from '../styles/search.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/search`;

export default class Index extends Component {

	static navigationOptions = ({navigation}) => ({
  		title: 'Search',
  		headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="chevron-left" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerRight: (
		    <TouchableOpacity>
		      <Icon name="share" style={headerRight} />
		    </TouchableOpacity>
		)
	});

	constructor(props) {
	    super(props);
	    this.state = {
	      isLoading: false,
	      nextPage: 0,
	      noMore: false,
	      hasError: false,
	      itemNum: 0,
	      query: null,
	      preQuery: null,
	      moreIsLoading: false,
	      searchResult: []
	    }
  	}


  	loadMoreIndicator = () => {
	    if (this.state.noMore) return null;
	    return (
	      <View style={searchStyles.loadMore}>
	        <ActivityIndicator animating={true}/>
	      </View>
	    );
  	}

  	requestData(chinese, text) {
  		let inputQuery=text;
  		let lang = chinese ? 'cn' : 'en';
  		let newNextPage = this.state.nextPage + 1;
  		if(this.state.preQuery != inputQuery) newNextPage =1;
  		if (this.state.noMore || this.state.moreIsLoading) return null;
  		if (newNextPage > 1) this.state.moreIsLoading = true;
      	let request_uri = `${BASE_REQUEST_URI}?q='${inputQuery}'&page=${newNextPage}`;
      	console.log("preQuery is"+this.state.preQuery);
      	console.log("itemNum is"+this.state.itemNum);
      	return fetch(request_uri)
	    .then(response => {
	      if (response.ok) return response.json()
	      throw new Error(`Unsuccessful response with status: ${response.status}`);
	    }).then(responseJson => {
	      this.setState( (prevState) => ({
	      	preQuery: inputQuery,
	        searchResult: responseJson.results,
	        nextPage: newNextPage,
	        isLoading: false,
	        moreIsLoading: false,
	      	noMore: responseJson.noMore,
	      	itemNum: responseJson.results.length
	      }) );
	      
	    }).catch(error => {
	      Alert.alert(error.message);
	      this.setState({ hasError: true })
	    });
  	}

	render() {	
		let content;
		if(this.state.nextPage == 0 ) content = <Text>thanks for using kicks4love</Text>
		else if(this.state.hasError) content = <Text>an error has occured</Text>
		else if(this.state.isLoading) content = <ActivityIndicator animating={true}/>
		else if(this.state.itemNum>0 && this.state.noMore){
			content = (
				<FlatList
			        data={this.state.searchResult}
			        renderItem={ ({ item }) => <SearchPostDetail metadata={item} /> }
			        keyExtractor={item => item.post_type + '/' + item.post.id}
			        style={searchStyles.list}
			    />)
		}
		else if(this.state.itemNum>0 && !this.state.noMore){
			content = (
				<FlatList
			        data={this.state.searchResult}
			        renderItem={ ({ item }) => <SearchPostDetail metadata={item} /> }
			        keyExtractor={item => item.post_type + '/' + item.post.id}
			        onEndReached={ () => this.requestData(false, this.state.query) }
			        onEndReachedThreshold={0}
			        style={searchStyles.list}
			    />)
		}
		else{
			content = <Text>no result found</Text>
		}
		return (
	      <View>
	      	 <TextInput
		        style={searchStyles.searchBar}
		        onChangeText={(text) => this.setState({ query: text })}
		        value={this.state.query}
		        onSubmitEditing = {() => this.requestData(false, this.state.query)}
		     />
		     {content}
		  </View>
	    );
	}
}