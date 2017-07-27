import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	text: {
		textAlign: 'center',
		fontSize: 12
	},
	textColor: {
		color: '#333'
	},
	searchBar: {
		height: 35,
		borderBottomWidth: 1,
		backgroundColor: '#f8f8f8',
		borderColor: '#e7e7e7',
		flexDirection: 'row',
		justifyContent: 'center',
    	alignItems: 'center',
    	marginBottom: 10
	},
	searchIcon: {
    	padding: 5,
    	marginTop: -2
	},
	searchInput: {
	    flex: 1,
	    paddingTop: 5,
	    paddingRight: 5,
	    paddingBottom: 5,
	    paddingLeft: 0,
	    backgroundColor: '#f8f8f8'
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
		alignItems: 'center', 
		justifyContent: 'center'
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
		color: '#9b9b9b',
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

module.exports = searchStyles;