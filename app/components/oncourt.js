import React, { Component } from 'react';
import { TouchableOpacity, Alert, Text, View, FlatList } from 'react-native';
import OnCourtPostDetail from './post/oncourtPostDetail';
import Loader from './loader';

import { flatList } from '../styles/oncourt.styles';

import { HOST, KEY } from '../config';
const BASE_REQUEST_URI = `${HOST}/api/v0/oncourt_posts`;

export default class OnCourt extends Component {
  static navigationOptions = {
    headerTitle: 'On Court'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      nextPage: 0,
      noMore: false,
      moreIsLoading: false,
      oncourtPosts: []
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
    let requestUri = `${BASE_REQUEST_URI}?next_page=${newNextPage}&l=${lang}`;
    let authConfig = { headers: { Authorization: `Token token=${KEY}` } };
    
    return fetch(requestUri, authConfig)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error(`Unsuccessful response with status: ${response.status}`);
      }).then(responseJson => {
        this.setState( (prevState) => ({
          oncourtPosts: prevState.oncourtPosts.concat(responseJson.posts),
          nextPage: newNextPage,
          isLoading: false,
          moreIsLoading: false,
          noMore: responseJson.no_more
        }) );
      }).catch((error) => {
        Alert.alert(error.message);
      });
  }

  loadMoreIndicator = () => {
    if (this.state.noMore) return null;
    return <Loader type='more' text='Loading more On Court posts...' />;
  }

  render() {
    let content;
    if (this.state.isLoading)
      content = <Loader type='initial' />;
    else {
      content = (
        <FlatList
          data={this.state.oncourtPosts}
          keyExtractor={item => item.post.id}
          extraData={this.state}
          renderItem={ ({ item }) => <OnCourtPostDetail metadata={item} /> }
          onEndReached={ () => this.requestData(false) }
          onEndReachedThreshold={0}
          ListFooterComponent={this.loadMoreIndicator}
          style={flatList}/>
      );
    }

    return content;
  }
}