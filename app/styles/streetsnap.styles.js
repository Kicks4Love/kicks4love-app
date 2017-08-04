import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	whiteBackground: {
		backgroundColor: '#fff'
	},
	fullBackground: {
		flex: 1
	},
	header: {
		paddingTop: 12,
		paddingBottom: 12,
		borderColor: '#2f2f2f',
		borderTopWidth: 2,
		borderBottomWidth: 2
	},
	marginContent: {
		marginTop: 10,
		marginBottom: 10
	},
	headerTitle: {
		textAlign: 'center',
	},
	postContainer: {
		margin: 10,
		height: 400
	},
	postBackgroundImage: {
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: 400
	},
	textColor: {
		color: '#333'
	},
	titleContainer: {
		padding: 5,
		backgroundColor: 'rgba(255,255,255,0.95)',
		marginTop: 20
	},
	title: {
		fontSize: 20,
		textAlign: 'center'
	},
	description: {
		height: 160,
		position: 'absolute',
		bottom: -115,
		left: 0,
		right: 0,
		padding: 15,
		backgroundColor: 'rgba(255,255,255,0.95)',
	},
	infoContainer: {
		height: 21,
		marginBottom: 15,
	},
	rating: {
		position: 'absolute',
		left: 0,
		flexDirection: 'row'
	},
	ratingImage: {
		height: 15,
		width: 21,
		marginLeft: 3
	},
	date: {
		position: 'absolute',
		right: 0,
		fontSize: 12,
		color: 'gray'
	},
	arrowLink: {
		marginTop: 8
	}
});

module.exports = styles;