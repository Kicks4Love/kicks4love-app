import React, { Component } from 'react';
import { Text, View, Image, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Share, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageProgress from 'react-native-image-progress';
import ImageViewer from 'react-native-image-zoom-viewer';
import Loader from './other/loader';

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
	    this.key = getPostStr(this.props.navigation.state.params.postType, 'share') + '/' + this.props.navigation.state.params.id;
	    this.state = { isLoading: true, newRate: 0, hideRate: true, ratePosted: false, currentRate: 0, voteCount: 0, imageModalShow: false, imageModalIndex: 0, mainImagesRatio: [] };

	    storage.load({
			key: this.key
		}).catch(error => {
			this.setState({hideRate: false});	// no recent rating found -> show the rating container
		});

		gaTracker.trackScreenView(this.key);
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
      	let authConfig = { headers: { Authorization: `Token token=${CONFIG.KEY}` } };

	    return fetch(requestUri, authConfig)
	      	.then(response => {
            	if (response.ok) return response.json()
            	throw new Error(`Unsuccessful response with status: ${response.status}`);
          	})
	      	.then(responseJson => {
	        	this.article = responseJson;
	        	this.article.post.content = chinese ? responseJson.post.content_cn : responseJson.post.content_en;
	        	this.setState({ isLoading: false, currentRate: this.article.score, voteCount: this.article.vote_count, mainImagesRatio: new Array(this.article.main_images.length).fill(0.75) });

		        let self = this;
            	this.article.main_images.forEach(function(item, index) {
              		Image.getSize(item.url, (srcWidth, srcHeight) => {
	                	var mainImagesRatioCopy = self.state.mainImagesRatio;
	                	mainImagesRatioCopy[index] = srcHeight/srcWidth;
	                	self.setState({mainImagesRatio: mainImagesRatioCopy});
	            	});
            	});
	      	})
          	.catch((error) => {
	        	Alert.alert(error.message);
	      	});
  	}

  	postRate() {
  		if (this.state.ratePosted) return null;

  		this.setState({ratePosted: true});
      	let headers = {
        	"Authorization": `Token token=${CONFIG.KEY}`,
        	'Accept': 'application/json',
        	'Content-Type': 'application/json'
      	}

  		fetch(`${BASE_REQUEST_URI}/rate`, {
		  	method: 'POST',
		  	headers: headers,
		  	body: JSON.stringify({
		    	score: this.state.newRate,
		    	post_type: getPostStr(this.props.navigation.state.params.postType, 'class'),
		    	id: this.props.navigation.state.params.id
		  	})
		})
		.then((response) => {
      		if (response.ok) return response.json()
      		throw new Error(`Unsuccessful response with status: ${response.status}`);
    	})
		.then((responseJson) => {
  			this.setState({currentRate: responseJson.score, voteCount: responseJson.count});
  			storage.save({ key: this.key, data: { rated: true } });
		})
   		.catch((error) => {
        	Alert.alert(error.message);
    	});
  	}

  	builderHeader() {
  		return (
	      	<View style={showStyles.header}>
	  			<Text style={showStyles.postType}><Icon name="tags" size={16} /> {getPostStr(this.props.navigation.state.params.postType, 'title')}</Text>
	  			<View style={showStyles.currentRate}>
	  				<Image source={this.state.currentRate >= 1 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.state.currentRate >= 2 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.state.currentRate >= 3 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.state.currentRate >= 4 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
	  				<Image source={this.state.currentRate == 5 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.currentRateImage} />
		  			<Text style={showStyles.currentRateVotes}>({this.state.voteCount} votes)</Text>
	  			</View>
	  			<Text style={[showStyles.marginContent, showStyles.textColor, showStyles.title]}>{this.article.post.title_en}</Text>
	  			<Text style={[showStyles.textColor, showStyles.author]}>By <Text style={showStyles.authorName}>{this.article.author_name}</Text></Text>
	  			<Text style={showStyles.postDate}>POSTED {this.article.post.created_at.slice(0, 10)}</Text>
	      	</View>
		);
  	}

  	buildRating() {
  		if (this.state.hideRate) return null;

  		let rateButtonText;
  		if (this.state.newRate > 0 && !this.state.ratePosted)
  			rateButtonText = <Text style={showStyles.newRateText}>Confirm<Icon name="hand-pointer-o" size={17} /></Text>;
  		else if (this.state.ratePosted)
  			rateButtonText = <Text style={showStyles.newRateText}>Thank You~</Text>;
  		else
  			rateButtonText = <Text style={showStyles.newRateText}>Rate it!</Text>;

  		return (
  			<View style={showStyles.ratingContainer}>
  				<TouchableWithoutFeedback onPress={() => this.state.ratePosted ? null : this.setState({newRate: 1})}><Image source={this.state.newRate >= 1 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.state.ratePosted ? null : this.setState({newRate: 2})}><Image source={this.state.newRate >= 2 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.state.ratePosted ? null : this.setState({newRate: 3})}><Image source={this.state.newRate >= 3 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
  				<TouchableWithoutFeedback onPress={() => this.state.ratePosted ? null : this.setState({newRate: 4})}><Image source={this.state.newRate >= 4 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
	  			<TouchableWithoutFeedback onPress={() => this.state.ratePosted ? null : this.setState({newRate: 5})}><Image source={this.state.newRate == 5 ? require('../images/sneakerblack.png') : require('../images/sneakergray.png')} style={showStyles.newRateImage} /></TouchableWithoutFeedback>
		  		<TouchableOpacity onPress={() => this.postRate()}>{rateButtonText}</TouchableOpacity>
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
	    			var self = this;
	    			(function(index) {
        				content.push(
	    					<View key={'image' + key} style={[{width: WIDTH - 30, height: self.state.mainImagesRatio[index] * (WIDTH - 30)}, showStyles.image, showStyles.marginContent]}>
	    						<TouchableOpacity onPress={() => self.setState(prevState => ({imageModalShow: !prevState.imageModalShow, imageModalIndex: index}))}>
	    							<ImageProgress source={{uri: self.article.main_images[index].url}} style={{width: WIDTH - 30, height: self.state.mainImagesRatio[index] * (WIDTH - 30)}} />
	    						</TouchableOpacity>
	    					</View>
	    				);
    				})(imageIndex);
	    			imageIndex++;
	    		} else {
	    			content.push(<Text key={'content' + key} style={[showStyles.marginContent, showStyles.textColor, showStyles.paragraph]}>{this.article.post.content[paragraphIndex].replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '')}</Text>);
	    			paragraphIndex++;
	    		}
	    	}
	    } else {
	    	var max = Math.max(this.article.post.content.length, this.article.main_images.length);
	    	for (let i = 0; i < max; i++) {
	    		if (this.article.post.content[i])
	    			content.push(<Text key={'content' + i} style={[showStyles.marginContent, showStyles.textColor, showStyles.paragraph]}>{this.article.post.content[i].replace(/<br\s*[\/]?>/gi, '\n').replace(/<(?:.|\n)*?>/gm, '')}</Text>);
	    		if (this.article.main_images[i]) {
	    			content.push(
	    				<View key={'image' + i} style={[{width: WIDTH - 30, height: this.state.mainImagesRatio[i] * (WIDTH - 30)}, showStyles.image, showStyles.marginContent]}>
	    					<TouchableOpacity onPress={() => this.setState(prevState => ({imageModalShow: !prevState.imageModalShow, imageModalIndex: i}))}>
	    						<ImageProgress source={{uri: this.article.main_images[i].url}} style={{width: WIDTH - 30, height: this.state.mainImagesRatio[i] * (WIDTH - 30)}} />
	    					</TouchableOpacity>
	    				</View>
	    			);
	    		}
	    	}
	    }

	    return (
	    	<ScrollView style={showStyles.container}>
	    		{header}
	    		{content}
	    		{rating}
	    		<Modal visible={this.state.imageModalShow} transparent={true}>
                	<ImageViewer imageUrls={this.article.main_images} index={this.state.imageModalIndex} onCancel={() => this.setState({imageModalShow: false})} />
            	</Modal>
	    	</ScrollView>
	    );
	}
}