import React, { Component } from 'react';
import { ActivityIndicator,View, Text, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';

const indexStyles = require('../styles/index.styles');
const width = Dimensions.get('window').width;

export default class Index extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataRecord: [],
    }
  }

  componentDidMount() {
    return fetch('https://4f2f9aed.ngrok.io/api/v0/home_posts?next_page=2&l=cn')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ 
          isLoading:false,
          dataRecord: responseJson.posts, 
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }


	build() {

    var contents = this.state.dataRecord.map(function (item){
      return (
          <View key={item.post.id} style={ indexStyles.slide }>
            <Image source={{uri: item.image_url}} style={indexStyles.slideImage}>
                <View style={indexStyles.slideImageInnerFrame}/>
            </Image>
            <Text style={indexStyles.text}>{item.post.title}</Text>
          </View>
      );
    });

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

		return (
			<Swiper showsButtons={true} autoplay={true} height={300} activeDotColor={'#fff'} paginationStyle={indexStyles.sliderPagination}
				nextButton={<Icon name="chevron-right" style={{color: '#fff', fontSize: 28}} />}
				prevButton={<Icon name="chevron-left" style={{color: '#fff', fontSize: 28}} />}
			>
        { contents }
      </Swiper>
		);
	}

	render() {
		let Content = this.build();

	    return (
	      	<ScrollView>
	        	{Content}
	      	</ScrollView>
	    );
	}
}