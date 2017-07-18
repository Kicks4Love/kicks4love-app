import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, WebView, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { headerLeft, headerRight } from '../styles/application.styles';
import showStyles from '../styles/show.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/`;
const WIDTH = Dimensions.get('window').width;

export default class Show extends Component {  
  	static navigationOptions = ({navigation}) => ({
    	headerTitle: navigation.state.params.postType,
    	headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
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
	    this.article = null;
	    this.state = { isLoading: true };
	}

	componentDidMount() {
    	return this.requestData(false);
  	}

  	requestData(chinese) {
  		let postType;
  		switch (this.props.navigation.state.params.postType.toLowerCase()) {
		    case 'features':
		      	postType = 'featured_posts';
		      	break;
		    case 'trend':
		      	postType = 'trend_posts';
		      	break;
		    case 'oncourt':
		      	postType = 'oncourt_posts';
		      	break;
		    case 'streetsnap':
		      	postType = 'streetsnap_posts';
		      	break;
		    case 'rumors':
		      	postType = 'rumor_posts';
		      	break;
		}

	    let requestUri = `${BASE_REQUEST_URI}/${postType}/${this.props.navigation.state.params.id}`;
	    return fetch(requestUri)
	      	.then(response => response.json())
	      	.then(responseJson => {
	        	this.article = responseJson;
	        	this.article.post.content = chinese ? responseJson.post.content_cn : responseJson.post.content_en;
	        	this.setState({
	        		isLoading: false
	        	});
	      	});
  	}

	render() {
		if (this.state.isLoading) {
	      	return (
	        	<View>
	          		<ActivityIndicator animating={true} size="large" />
	        	</View>
	      	);
	    }

	    let content = [];

	    if (this.article.post.post_composition) {
	    	var imageIndex = paragraphIndex = 0;
	    	for (var key in this.article.post.post_composition) {
	    		if (this.article.post.post_composition[key].type == 'image') {
	    			content.push(<Image key={'image' + key} source={{uri: this.article.main_images[imageIndex].url, width: WIDTH - 20, height: 0.75 * (WIDTH - 20)}} style={[showStyles.marginContent, showStyles.image]} />);
	    			imageIndex++;
	    		} else {
	    			content.push(<Text key={'content' + key} style={showStyles.marginContent}>{this.article.post.content[paragraphIndex]}</Text>);
	    			paragraphIndex++;
	    		}
	    	}
	    } else {
	    	var max = Math.max(this.article.post.content.length, this.article.main_images.length);
	    	for (var i = 0; i < max; i++) {
	    		if (this.article.post.content[i])
	    			content.push(<Text key={'content' + i} style={showStyles.marginContent}>{this.article.post.content[i]}</Text>);
	    		if (this.article.main_images[i])
	    			content.push(<Image key={'image' + i} source={{uri: this.article.main_images[i].url, width: WIDTH - 20, height: 0.75 * (WIDTH - 20)}} style={[showStyles.marginContent, showStyles.image]} />);
	    	}
	    }

	    return (
	    	<ScrollView style={showStyles.container}>
	    		{content}
	    	</ScrollView>
	    );
	}
} 