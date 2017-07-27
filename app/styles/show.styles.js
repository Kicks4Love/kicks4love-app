import { StyleSheet } from 'react-native';

const showStyles = StyleSheet.create({
	container: {
		paddingLeft: 15, 
		paddingRight: 15,
		backgroundColor: '#fff'
	},
	header: {
		marginTop: 20,
		marginBottom: 10
	},
	textColor: {
		color: '#333'
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
	image: {
		alignItems: 'center', 
		justifyContent: 'center'
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
	marginContent: {
		marginTop: 10,
		marginBottom: 10
	},
	ratingContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 20
	},
	newRateImage: {
		height: 30,
		width: 43,
		resizeMode: 'contain'
	},
	newRateText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#7b8994'
	}
});

module.exports = showStyles;