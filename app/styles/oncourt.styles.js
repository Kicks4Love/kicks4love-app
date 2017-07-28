import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	flatList: {
		backgroundColor: '#fff',
		paddingLeft: 15,
		paddingRight: 15
	},
	postContainer: {
		height: 450,
	},
	postBackgroundImage: {
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: 450
	},
	postInnerFrame: {
		backgroundColor: 'rgba(0, 0, 0, .4)',
		flex: 1
	},
	marginContent: {
		marginTop: 10,
		marginBottom: 10
	},
	topInfo: {
		flexDirection: 'row',
		padding: 10,
	},
	date: {
		color: '#fff',
		opacity: 0.8,
		marginRight: 20
	},
	ratingImage: {
		height: 13,
		width: 18,
		marginTop: 2,
		marginRight: 2
	},
	moreLink: {
		color: '#fff',
		opacity: 0.8,
		position: 'absolute',
		right: 10,
		top: 8
	},
	postContent: {
		position: 'absolute',
		left: 40,
		right: 40,
		bottom: 25
	},
	playerName: {
		color: '#fff',
		marginBottom: 20,
		fontSize: 45,
		lineHeight: 45
	},
	playerFirstName: {
		fontWeight: '300'
	},
	playerLastName: {
		fontWeight: 'bold'
	},
	postTitle: {
		borderColor: '#fff',
		borderTopWidth: 2,
		paddingTop: 15
	},
	postTitleText: {
		color: '#fff'
	}
});

module.exports = styles;