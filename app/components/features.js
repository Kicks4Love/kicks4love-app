import React, { Component } from 'react';
import { ActivityIndicator, Text, View, ListView } from 'react-native';
import FeaturePostDetail from './post/featurePostDetail';
import { container, loading, loadMore } from '../styles/features.styles';

const BASE_REQUEST_URI = 'https://9ff6ba98.ngrok.io/api/v0/featured_posts';

export default class Index extends Component {
  static navigationOptions = {
    headerTitle: 'Features'
  }

  constructor(props) {
    super(props);
    let initial_ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      isLoading: true,
      next_page: 0,
      no_more: false,
      hasError: false,
      moreIsLoading: false,
      postsDs: initial_ds,
      featuredPosts: []
    }
  }

  componentDidMount() {
    return this.requestData(true);
  }

  requestData(chinese) {
    if (this.state.no_more) return null;

    let new_next_page = this.state.next_page + 1;
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${new_next_page}&l=${lang}`;
    if (new_next_page > 1)
      this.setState({moreIsLoading: true});
    return fetch(request_uri)
      .then(response => response.json())
      .then(responseJson => {
        updated_featuredPosts = this.state.featuredPosts.concat(responseJson.posts);
        this.setState( (prevState) => ({
          featuredPosts: updated_featuredPosts,
          next_page: new_next_page,
          isLoading: false,
          postsDs: prevState.postsDs.cloneWithRows(updated_featuredPosts),
          moreIsLoading: false,
          no_more: responseJson.no_more
        }) );
      })
      .catch(error => {
        this.setState({isLoading: false, hasError: true});
      });
  }

  loadMoreIndicator() {
    let shouldShow = this.state.moreIsLoading && !this.state.no_more;
    let loadMoreStuff = shouldShow ? <ActivityIndicator animating={true}/> : null;
    return (
      <View style={loadMore}>
        {loadMoreStuff}
      </View>
    );
  }

  // TODO: set error view
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
          <ListView
            dataSource={this.state.postsDs}
            renderRow={ (rowData) => <FeaturePostDetail metadata={rowData} /> }
            onEndReached={ () => this.requestData(true) }
            renderFooter={ () => this.loadMoreIndicator() }
            onEndReachedThreshold={10}
            scrollEventThrottle={150} />
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