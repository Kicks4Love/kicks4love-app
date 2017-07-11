import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper';

const indexStyles = require('../styles/index.styles');
const width = Dimensions.get('window').width;

export default class Index extends Component {  
	build() {
		// TODO: make build built from api call

		return (
			<Swiper showsButtons={true} autoplay={true} height={300} activeDotColor={'#fff'} paginationStyle={indexStyles.sliderPagination}
				nextButton={<Icon name="chevron-right" style={{color: '#fff', fontSize: 28}} />}
				prevButton={<Icon name="chevron-left" style={{color: '#fff', fontSize: 28}} />}
			>
        		<View style={indexStyles.slide}>
        			<Image source={{uri: 'https://kicks4love.com/uploads/post/15/Curry3_-5.jpg'}} style={indexStyles.slideImage}>
        				<View style={indexStyles.slideImageInnerFrame}/>
        			</Image>
          			<Text style={indexStyles.text}>Ten Top most memorable Curry 3s in This Season</Text>
        		</View>
        		<View style={indexStyles.slide}>
        			<Image source={{uri: 'https://kicks4love.com/uploads/post/20/foam.jpg'}} style={indexStyles.slideImage}>
        				<View style={indexStyles.slideImageInnerFrame}/>
        			</Image>
          			<Text style={indexStyles.text}>Top 4 must-knows about Foamposite</Text>
        		</View>
        		<View style={indexStyles.slide}>
        			<Image source={{uri: 'https://kicks4love.com/uploads/post/23/YezzyDGreen.jpg'}} style={indexStyles.slideImage}>
        				<View style={indexStyles.slideImageInnerFrame}/>
        			</Image>
          			<Text style={indexStyles.text}>Adidas Yezzy 350 "Dark Green" will be release next month</Text>
        		</View>
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