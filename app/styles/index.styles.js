import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
	list: {
		backgroundColor: '#fff'
	},
	sliderPagination: {
		position: 'absolute',
		bottom: 55
	},
	slide: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column'
	},
	slideImage: {
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 250
	},
	slideImageInnerFrame: {
		backgroundColor: 'rgba(0, 0, 0, .2)',
		flex: 1
	},
	slideText: {
		height: 50,
		fontSize: 17,
		fontWeight: 'bold',
		position: 'absolute',
		backgroundColor: '#fff',
		bottom: 0,
		left: 0,
		right: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5
	},
	logan: {
		backgroundColor: '#999999',
		color: '#fff',
		padding: 12,
		textAlign: 'center',
		marginBottom: 10
	},
	box: {
		flexDirection: 'row',
		height: 120,
		padding: 10,
		backgroundColor: '#fff',
		elevation: 1,
		shadowColor: '#777',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		marginBottom: 10
	},
	coverImage: {
		resizeMode: 'cover'
	},
	boxContent: {
		flex: 1,
		marginLeft: 10
	},
	boxTitle: {
		fontWeight: 'bold',
		fontSize: 16
	},
	boxDate: {
		fontWeight: '200',
		color: '#9b9b9b',
		fontSize: 12
	},
	boxPostType: {
		position: 'absolute',
		bottom: 0,
		left: 0
	},
	boxPostTypeText: {
		textDecorationLine: 'underline',
		textDecorationStyle: 'dotted'
	},
	boxRate: {
		position: 'absolute',
		bottom: 0,
		right: 0
	},
	boxRateImage: {
		height: 15,
		width: 20,
		resizeMode: 'contain',
		marginTop: 3
	}
});

module.exports = indexStyles;