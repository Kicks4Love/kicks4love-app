import React, { Component } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

const indexStyles = require('../styles/index.styles');
const width = Dimensions.get('window').width;
import { logo } from '../styles/application.styles'


export default class Index extends Component {
	static navigationOptions = {
		headerTitle: <Image source={require('../images/nav_logo.png')} style={ logo } />
	};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, sliderRecord: [], postRecord: [] }
  }

  componentDidMount() {
    return fetch('https://9ff6ba98.ngrok.io/api/v0/home_posts?next_page=1')
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
      <View>
  			<Swiper showsButtons={true} autoplay={true} height={300} activeDotColor={'#fff'} paginationStyle={indexStyles.sliderPagination}
  				nextButton={<Icon name="chevron-right" style={{color: '#fff', fontSize: 28}} />}
  				prevButton={<Icon name="chevron-left" style={{color: '#fff', fontSize: 28}} />}
  			>
          {slider}
        </Swiper>
        <Text style={indexStyles.logan}><Icon name="check" /> Using Kicks4Love App, Better Experience</Text>
        {posts}
      </View>
		);
	}

	render() {
		let content = this.build();

	  return (
	    <ScrollView>
	      {content}
	    </ScrollView>
	  );
	}
}
