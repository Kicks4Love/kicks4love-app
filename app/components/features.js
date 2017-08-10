import React, { Component } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import FeaturePostDetail from './post/featurePostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import { flatList } from '../styles/features.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/featured_posts`;

export default class Features extends Component {
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
      featuredPosts: []
    };
  }

  componentDidMount() {
    return this.requestData();
  }

  requestData() {
    if (this.state.noMore || this.state.moreIsLoading) return null;

    let newNextPage = this.state.nextPage + 1;
    if (newNextPage > 1) this.state.moreIsLoading = true;
    let lang = this.props.navigation.state.params.lang
    let requestUri = `${BASE_REQUEST_URI}?next_page=${newNextPage}&l=${lang}`;
    let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

    return fetch(requestUri, authConfig)
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
          data={this.state.featuredPosts}
          keyExtractor={item => item.post.id}
          extraData={this.state}
          renderItem={ ({ item }) => <FeaturePostDetail metadata={item} /> }
          onEndReached={ () => this.requestData() }
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.loadMoreIndicator}
          style={flatList}/>
      );
    }

    return content;
  }
}