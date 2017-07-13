import React, { Component } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, ScrollView, FlatList,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { List, ListItem } from "react-native-elements";

const indexStyles = require('../styles/index.styles');
const width = Dimensions.get('window').width;

export default class Index extends Component {  
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      sliderRecord: [], 
      postRecord: [],
      page:1
   }
  }

  makeRemoteRequest = () => {
    return fetch('https://1a8ca480.ngrok.io/api/v0/home_posts?next_page='+ this.state.page)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          sliderRecord: responseJson.slider_posts, 
          postRecord: page==1 ? responseJson.posts : [...this.state.postRecord, ...responseJson.posts],
        });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page +1
    }, () =>{
      this.makeRemoteRequest();
    });

  };

  componentDidMount() {
    return fetch('https://1a8ca480.ngrok.io/api/v0/home_posts?next_page=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          sliderRecord: responseJson.slider_posts, 
          postRecord: responseJson.posts
        });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }



	build() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    let slider = this.state.sliderRecord.map(function (item){
      return (
        <View key={item.post_type + '/' + item.post.id} style={indexStyles.slide}>
          <Image source={{uri: item.image_url}} style={indexStyles.slideImage}>
            <View style={indexStyles.slideImageInnerFrame}/>
          </Image>
          <Text style={indexStyles.slideText}>{item.post.title}</Text>
        </View>
      );
    });

    let posts = this.state.postRecord.map(function (item){
      let tag = '';
      switch (item.post_type) {
        case 'features':
          tag = 'Features';
          break;
        case 'trend':
          tag = 'Trend';
          break;
        case 'oncourt':
          tag = 'On Court';
          break;
        case 'streetsnap':
          tag = 'Street Snap';
          break;
        case 'rumors':
          tag = 'Rumors';
          break;
      }
      return (
        <View key={item.post_type + '/' + item.post.id} style={indexStyles.box}>
          <Image source={{uri: item.image_url, width: width * 0.4, height: 100}} style={indexStyles.coverImage} />
          <View style={indexStyles.boxContent}>
            <Text style={indexStyles.boxTitle}>{item.post.title} <Text style={indexStyles.boxDate}>{item.post.created_at.slice(0, 10)}</Text></Text>
            <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{tag}</Text></Text>
            <Text style={indexStyles.boxRate}>{item.score}/5.0 <Image source={require('../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
          </View>
        </View>
      );
    });

		return (
      <ScrollView>
  			<Swiper showsButtons={true} autoplay={true} height={300} activeDotColor={'#fff'} paginationStyle={indexStyles.sliderPagination}
  				nextButton={<Icon name="chevron-right" style={{color: '#fff', fontSize: 28}} />}
  				prevButton={<Icon name="chevron-left" style={{color: '#fff', fontSize: 28}} />}
  			>
          {slider}
        </Swiper>
        <Text style={indexStyles.logan}><Icon name="check" /> Using Kicks4Love App, Better Experience</Text>
      </ScrollView>
		);
	}

	render() {
		let content = this.build();

	  return (
      <List>
  	      {content}

          <FlatList
            data={this.state.postRecord}
            renderItem={({item}) => (
                <View style={indexStyles.box}>
                  <Image source={{uri: item.image_url, width: width * 0.4, height: 100}} style={indexStyles.coverImage} />
                  <View style={indexStyles.boxContent}>
                    <Text style={indexStyles.boxTitle}>{item.post.title} <Text style={indexStyles.boxDate}>{item.post.created_at.slice(0, 10)}</Text></Text>
                    <Text style={indexStyles.boxPostType}><Icon name="tags" /><Text style={indexStyles.boxPostTypeText}>{item.post_type}</Text></Text>
                    <Text style={indexStyles.boxRate}>{item.score}/5.0 <Image source={require('../images/sneakerblack.png')} style={indexStyles.boxRateImage} /></Text>
                  </View>
                </View>
            )}
            onEndReached = {this.handleLoadMore}
            onEndThreshold = {0}
            keyExtractor={item => item.post_type + '/' + item.post.id}
          />
      </List>
	  );
	}
}