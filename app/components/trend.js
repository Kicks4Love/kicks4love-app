import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import TrendPostDetail from './post/trendPostDetail';
import { container, loading, loadMore } from '../styles/trend.styles';

const BASE_REQUEST_URI = 'https://5b9ea66b.ngrok.io/api/v0/trend_posts?';

export default class Index extends Component {
	static navigationOptions = {
    	headerTitle: 'Trend'
  	}

	constructor(props) {
     	super(props);
     	this.state = {
	      	isLoading: true,
	      	next_page: 0,
	      	no_more: false,
	      	hasError: false,
	      	moreIsLoading: false,
	      	TrendPosts: []
    	}
  	}

  	componentDidMount() {
    	return this.requestData(true);
  	}

  	requestData(chinese) {
	    if (this.state.no_more || this.state.moreIsLoading) return null;

	    let new_next_page = this.state.next_page + 1;
	    if (new_next_page > 1)
	      this.setState({moreIsLoading: true});
	    let lang = chinese ? 'cn' : 'en';
	    let request_uri = `${BASE_REQUEST_URI}next_page=${new_next_page}&l=${lang}`;

	    return fetch(request_uri)
	    .then(response => {
	      if (response.ok) return response.json()
	      throw new Error(`Unsuccessful response with status: ${response.status}`);
	    }).then(responseJson => {
	      this.setState( (prevState) => ({
	        TrendPosts: prevState.TrendPosts.concat(responseJson.posts),
	        next_page: new_next_page,
	        isLoading: false,
	        moreIsLoading: false,
	        no_more: responseJson.no_more
	      }) );
	    }).catch(error => {
	      console.log(error);
	      this.setState({isLoading: false, hasError: true});
	    });
  	}

  	loadMoreIndicator = () => {
	    let shouldShow = this.state.moreIsLoading && !this.state.no_more;
	    if (!shouldShow) return null;
	    return (
	      <View style={loadMore}>
	        <ActivityIndicator animating={true}/>
	      </View>
	    );
  	}

  	render() {
	    let content;
	    if (this.state.isLoading) {
	      content = (
	        <ActivityIndicator animating={true} size="large" />
	      );
	    } else {
	      if (this.state.hasError)
	        content = <Text>An error occured</Text>
	      else {
	        content = (
	          <FlatList
	            data={this.state.TrendPosts}
	            keyExtractor={item => item.post.id}
	            extraData={this.state}
	            renderItem={ ({ item }) => <TrendPostDetail metadata={item} /> }
	            onEndReached={ () => this.requestData(true) }
	            onEndReachedThreshold={0.5}
	            ListFooterComponent={this.loadMoreIndicator}/>
	        )
	      }
	    }

	    return (
	      <View style={container}>
	        { content }
	      </View>
	    );
  }
}