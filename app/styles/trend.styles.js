import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	flatList: {
		backgroundColor: '#fff'
	},
	loadMore: {
		marginTop: 5,
		marginBottom: 5
	},
	loadMoreText: {
		marginTop: 5,
		textAlign: 'center',
		fontSize: 12
	},
	postContainer: {
		borderWidth: 3,
		height: 450
	},
	postBackgroundImage: {
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: 444
	},
	postInnerFrame: {
		backgroundColor: 'rgba(0, 0, 0, .2)',
		flex: 1
	},
	postContent: {
		position: 'absolute',
		bottom: 30,
		left: 15
	},
	postContentTitle: {
		fontSize: 30,
		fontWeight: '500'
	},
	colorWhite: {
		color: '#fff'
	}
});

module.exports = styles;