import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { headerLeft, headerRight } from '../styles/application.styles'

const CONFIG = require('../config');

export default class Show extends Component {  
  	static navigationOptions = ({navigation}) => ({
    	headerTitle: navigation.state.params.postType,
    	headerLeft: (
		    <TouchableOpacity onPress={() => navigation.navigate(navigation.state.params.sourcePage)} >
		      	<Icon name="chevron-left" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerRight: (
		    <TouchableOpacity>
		      <Icon name="share" style={headerRight} />
		    </TouchableOpacity>
		)
  	});

	constructor(props) {
	    super(props);
	    this.state = { isLoading: false };
	}

	componentDidMount() {
    	return this.requestData(false);
  	}

  	requestData(chinese) {
	    /*let lang = chinese ? 'cn' : 'en';
	    let selectedMonth = this.state.months[this.state.currentMonthIndex];
	    let request_uri = `${BASE_REQUEST_URI}?year=${selectedMonth.getFullYear()}&month=${selectedMonth.getMonth() + 1}&l=${lang}`;
	    return fetch(request_uri)
	      	.then(response => response.json())
	      	.then(responseJson => {
	        	let newPosts = [];
	        	responseJson.posts.forEach(function(data) {
	          		newPosts.push({
			            id: data.post.id,
			            title: data.post.title,
			            date: new Date(data.post.release_date),
			            price: data.post.price,
		            	image: data.image_url
	          		});
	        	});
	        	newPosts.sort(function(a,b) { return a.date - b.date; });
	        	this.setState({
	          		posts: newPosts,
	          		isLoading: false
	        	});
	      	});*/
  	}

	render() {
		return <Text>{this.props.navigation.state.params.sourcePage}</Text>
	}
} 