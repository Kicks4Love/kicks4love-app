import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Share, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './loader';

import { headerLeft, headerRight } from '../styles/application.styles';
import showStyles from '../styles/show.styles';

const CONFIG = require('../config');
const BASE_REQUEST_URI = `${CONFIG.HOST}/api/v0/`;
const WIDTH = Dimensions.get('window').width;

var getPostStr = require('../helpers/getPostStr');

export default class Show extends Component {  
  	static navigationOptions = ({navigation}) => ({
    	headerTitle: getPostStr(navigation.state.params.postType, 'title'),
    	headerLeft: (
		    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
		      	<Icon name="chevron-left" style={headerLeft} />
		    </TouchableOpacity>
		),
		headerRight: (
		    <TouchableOpacity onPress={() => navigation.state.params.shareTo(navigation.state.params.title, `${CONFIG.HOST}/${getPostStr(navigation.state.params.postType, 'share')}/${navigation.state.params.id}`)} >
		      <Icon name="share" style={headerRight} />
		    </TouchableOpacity>
		)
  	});

	constructor(props) {
	    super(props);
	    this.article = null;
	    this.state = { isLoading: true, newRate: 0 };
	}

	componentDidMount() {
		this.props.navigation.setParams({ shareTo: this.shareTo });
    	return this.requestData(false);
  	}

  	shareTo(url, title) {
	  	Share.share({
		    message: 'The destination for all sneaker fans and trend enthusiasts 所有球鞋热爱家和潮流脑残粉的终极平台',
		    url: url,
		    title: title
	  	}, {
	    	dialogTitle: 'Share Kicks4Love',
	  	});
	}

  	requestData(chinese) {
	    let requestUri = `${BASE_REQUEST_URI}/${getPostStr(this.props.navigation.state.params.postType, 'api')}/${this.props.navigation.state.params.id}`;
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

  	builderHeader() {
  		return (
	      	<View style={showStyles.header}>
	  			<Text style={showStyles.postType}><Icon name="tags" style={{fontSize: 16}} /> {getPostStr(this.props.navigation.state.params.postType, false)}</Text>
	  			<View style={showStyles.currentRate}>
	  				<Image source={this.article.score >= 1 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.article.score >= 2 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.article.score >= 3 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.article.score >= 4 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.article.score == 5 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
		  			<Text style={showStyles.currentRateVotes}>({this.article.vote_count} votes)</Text>
	  			</View>
	  			<Text style={[showStyles.marginContent, showStyles.title]}>{this.article.post.title_en}</Text>
	  			<Text style={showStyles.author}>By <Text style={showStyles.authorName}>{this.article.author_name}</Text></Text>
	  			<Text style={showStyles.postDate}>POSTED {this.article.post.created_at.slice(0, 10)}</Text>
	      	</View>
		);
  	}

  	buildRating() {
  		let rateButtonText;
  		if (this.state.newRate > 0)
  			rateButtonText = <Text style={showStyles.newRateText}>Confirm<Icon name="hand-pointer-o" style={{fontSize: 17}} /></Text>
  		else
  			rateButtonText = <Text style={showStyles.newRateText}>Rate it!</Text>

  		return (
  			<View style={showStyles.ratingContainer}>
  				<TouchableWithoutFeedback onPress={() => this.setState({newRate: 1})}><Image source={this.state.newRate >= 1 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.setState({newRate: 2})}><Image source={this.state.newRate >= 2 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.setState({newRate: 3})}><Image source={this.state.newRate >= 3 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.setState({newRate: 4})}><Image source={this.state.newRate >= 4 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
	  			<TouchableWithoutFeedback onPress={() => this.setState({newRate: 5})}><Image source={this.state.newRate == 5 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
		  		<TouchableOpacity>{rateButtonText}</TouchableOpacity>
  			</View>
  		);
  	}

	render() {
		if (this.state.isLoading) 
			return <Loader type='initial' />

	    let header = this.builderHeader();
	    let content = [];
	    let rating = this.buildRating();

	    if (this.article.post.post_composition) {
	    	var imageIndex = paragraphIndex = 0;
	    	for (var key in this.article.post.post_composition) {
	    		if (this.article.post.post_composition[key].type == 'image') {
	    			content.push(<Image key={'image' + key} source={{uri: this.article.main_images[imageIndex].url, width: WIDTH - 30, height: 0.75 * (WIDTH - 30)}} style={[showStyles.marginContent, showStyles.image]} />);
	    			imageIndex++;
	    		} else {
	    			content.push(<Text key={'content' + key} style={[showStyles.marginContent, showStyles.paragraph]}>{this.article.post.content[paragraphIndex].replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '')}</Text>);
	    			paragraphIndex++;
	    		}
	    	}
	    } else {
	    	var max = Math.max(this.article.post.content.length, this.article.main_images.length);
	    	for (var i = 0; i < max; i++) {
	    		if (this.article.post.content[i])
	    			content.push(<Text key={'content' + i} style={[showStyles.marginContent, showStyles.paragraph]}>{this.article.post.content[i].replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '')}</Text>);
	    		if (this.article.main_images[i])
	    			content.push(<Image key={'image' + i} source={{uri: this.article.main_images[i].url, width: WIDTH - 30, height: 0.75 * (WIDTH - 30)}} style={[showStyles.marginContent, showStyles.image]} />);
	    	}
	    }

	    return (
	    	<ScrollView style={showStyles.container}>
	    		{header}
	    		{content}
	    		{rating}
	    	</ScrollView>
	    );
	}
} 