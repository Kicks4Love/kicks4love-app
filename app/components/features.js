import React, { Component } from 'react';
import { ActivityIndicator, Text, View, ListView } from 'react-native';

const { container, loading } = require('../styles/features.styles');

const BASE_REQUEST_URI = 'https://9ff6ba98.ngrok.io/api/v0/featured_posts';

export default class Index extends Component {

  static navigationOptions ={
    headerTitle: 'Features'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

      next_page: 1,
      no_more: false,
      hasError: false
    }
  }

  componentDidMount() {

    return this.requestData(true, this.state.next_page);

  }
  requestData(chinese, next_page) {
    let lang = chinese ? 'cn' : 'en';
    let request_uri = `${BASE_REQUEST_URI}?next_page=${this.state.next_page}&l=${lang}`;
    return fetch(request_uri)
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
          featuredPosts: ds.cloneWithRows(responseJson.posts),
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({isLoading: false, hasError: true});
        console.log(error);
      });
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
      content = (
        <ListView
          dataSource={this.state.featuredPosts}
          renderRow={(rowData) => <Text>{rowData.post.title}</Text>}/>
      )
    }
    return (
      <View style={container}>
        { content }
      </View>
    );
  }
}
