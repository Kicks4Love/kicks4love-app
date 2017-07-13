import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import FeaturePostDetail from './post/FeaturePostDetail';
import { container, loading, loadMore } from '../styles/features.styles';

const BASE_REQUEST_URI = 'https://9ff6ba98.ngrok.io/api/v0/featured_posts';

export default class Index extends Component {
  static navigationOptions = {
    headerTitle: 'Features'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      next_page: 0,
      no_more: false,
      hasError: false,
      moreIsLoading: false,
      featuredPosts: []
    }
  }

  componentDidMount() {
    return this.requestData(true);
  }

  requestData(chinese) {
    if (this.state.no_more || this.state.moreIsLoading)
      return null;
    let new_next_page = this.state.next_page + 1;
    if (new_next_page > 1)
      this.setState({moreIsLoading: true});
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${new_next_page}&l=${lang}`;
    console.log(`making request with ${request_uri}`);
    return fetch(request_uri)
      .then(response => response.json())
      .then(responseJson => {
        this.setState( (prevState) => ({
          featuredPosts: prevState.featuredPosts.concat(responseJson.posts),
          next_page: new_next_page,
          isLoading: false,
          moreIsLoading: false,
          no_more: responseJson.no_more
        }) );
      })
      .catch(error => {
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
        <ActivityIndicator
          animating={true}
          size="large"
          style={ loading }/>
      )
    } else {
      if (this.state.hasError) {
        content = <Text>An error occured</Text>
      } else {
        content = (
          <FlatList
            data={this.state.featuredPosts}
            keyExtractor={item => item.post.id}
            extraData={this.state}
            renderItem={ ({ item }) => <FeaturePostDetail metadata={item} /> }
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
