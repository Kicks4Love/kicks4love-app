import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

const calendarStyles = require('../styles/calendar.styles');
const width = Dimensions.get('window').width;
const currentDate = new Date();

class MonthSwiper extends Component 
	constructor(props) {
    	super(props);
  	}

	render() {
		let self = this;
	    let months = this.state.months.map(function (item, index) {
      		return (
        		<View style={calendarStyles.switch}><Text style={self. === self.state.currentIndex ? calendarStyles.selectedDate : {}}>{item.toISOString().slice(0, 7)}</Text></View>
      		);
    	});


	}
}

export default class Index extends Component {  
	constructor(props) {
    	super(props);
    	this.state = { isLoading: true };
  	}

  	buildMonths() {
  		let months = this.state.months.map(function (item, index) {
      		return (
        		<View style={calendarStyles.switch}><Text style={index === this.state.currentIndex ? calendarStyles.selectedDate : {}}>{item.toISOString().slice(0, 7)}</Text></View>
      		);
    	});

  		return (
  			<View style={{alignItems: 'center'}}>
	  			<Swiper ref='monthSwiper' index={3} onMomentumScrollEnd={this.updateIndex} showsButtons={true} height={80} width={width*0.5} showsPagination={false} loop={false} bounces={true} style={calendarStyles.switchSwiper}
	  				nextButton={<Icon name="chevron-right" style={{color: '#999', fontSize: 18, fontWeight: '100'}} />}
  					prevButton={<Icon name="chevron-left" style={{color: '#999', fontSize: 18, fontWeight: '100'}} />}
  				>
		  			{months}
		  		</Swiper>
		  	</View>
	  	);
  	}

  	render() {
  		let monthSwiper = this.buildMonths();

    	return (
    		<ScrollView>
    			{monthSwiper}
      		</ScrollView>
    	);
  	}
}