import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import FeaturePostDetail from './post/featurePostDetail';
import Loader from './loader';

import { container, loadMore, flatList } from '../styles/features.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/featured_posts`;

export default class Index extends Component {
  static navigationOptions = {
    headerTitle: 'Features'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      nextPage: 0,
      noMore: false,
      hasError: false,
      moreIsLoading: false,
      featuredPosts: []
    }
  }

  componentDidMount() {
    return this.requestData(false);
  }

  requestData(chinese) {
    if (this.state.noMore || this.state.moreIsLoading) return null;

    let newNextPage = this.state.nextPage + 1;
    if (newNextPage > 1) this.state.moreIsLoading = true;
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${newNextPage}&l=${lang}`;

    return fetch(request_uri)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error(`Unsuccessful response with status: ${response.status}`);
    }).then(responseJson => {
      this.setState( (prevState) => ({
        featuredPosts: prevState.featuredPosts.concat(responseJson.posts),
        nextPage: newNextPage,
        isLoading: false,
        moreIsLoading: false,
        noMore: responseJson.no_more
      }) );
    }).catch(error => {
      this.setState({isLoading: false, hasError: true});
    });
  }

  loadMoreIndicator = () => {
    if (this.state.noMore) return null;
    return <Loader type='more' text='Loading more Features posts...' />;
  }

  render() {
    let content;
    if (this.state.isLoading)
      content = <Loader type='initial' />;
    else {
      if (this.state.hasError)
        content = <View style={container}><Text>An error occured</Text></View>
      else {
        content = (
          <FlatList
            data={this.state.featuredPosts}
            keyExtractor={item => item.post.id}
            extraData={this.state}
            renderItem={ ({ item }) => <FeaturePostDetail metadata={item} /> }
            onEndReached={ () => this.requestData(false) }
            onEndReachedThreshold={0}
            ListFooterComponent={this.loadMoreIndicator}
            style={flatList}/>
        )
      }
    }

    return content;
  }
}