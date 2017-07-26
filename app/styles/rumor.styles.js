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
		margin: 10
	},
	postContentTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 22,
		color: '#333'
	},
	subtitleContainer: {
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 5
	},
	postContentSubtitle: {
		width: 200,
		borderColor: '#2f2f2f',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingTop: 6,
		paddingBottom: 6,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	date: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#333'
	},
	rateImage: {
		height: 15,
		width: 20,
		resizeMode: 'contain',
	},
	postContentPreview: {
		color: '#333'
	}
});

module.exports = styles;