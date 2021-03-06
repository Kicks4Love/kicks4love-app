import React, { Component } from 'react';
import { TouchableOpacity, Alert, Text, View, FlatList } from 'react-native';
import OnCourtPostDetail from './post/oncourtPostDetail';
import Loader from './other/loader';
import I18n from '../i18n/I18n';

import { flatList } from '../styles/oncourt.styles';

import { HOST, KEY, ENV } from '../config';
const BASE_REQUEST_URI = `${HOST}/api/v0/oncourt_posts`;

export default class OnCourt extends Component {
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
      oncourtPosts: []
    };
  }

  componentDidMount() {
    return this.requestData();
  }

  requestData() {
    if (this.state.noMore || this.state.moreIsLoading) return null;

    let newNextPage = this.state.nextPage + 1;
    if (newNextPage > 1) this.state.moreIsLoading = true;
    let lang = this.props.navigation.state.params.lang;
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
    return <Loader type='more' text={I18n.t('loadMoreIndicatorText')} />;
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
          onEndReached={ () => this.requestData() }
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.loadMoreIndicator}
          style={flatList}/>
      );
    }

    return content;
  }
}