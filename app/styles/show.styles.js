import { StyleSheet } from 'react-native';

const showStyles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingLeft: 10, 
		paddingRight: 10,
		backgroundColor: '#fff'
	},
	header: {
		marginBottom: 10
	},
	postType: {
		color: '#7b8994',
		fontSize: 18
	},
	currentRate: {
		position: 'absolute',
		right: 0,
		top: -5,
		flexDirection: 'row'
	},
	currentRateImage: {
		height: 15,
		width: 20,
		resizeMode: 'contain',
		marginTop: 3
	},
	currentRateVotes: {
		color: '#7b8994',
		fontSize: 10,
		position: 'absolute',
		right: 0,
		bottom: -15
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold'
	},	
	author: {
		fontSize: 16
	},
	authorName: {
		fontStyle: 'italic'
	},
	postDate: {
		color: '#7b8994',
		fontSize: 11,
		marginTop: 5
	},
	paragraph: {
		fontSize: 16
	},
	image: {
		resizeMode: 'cover',
	},
	marginContent: {
		marginTop: 10,
		marginBottom: 10
	}
});

module.exports = showStyles;