import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	flatList: {
		backgroundColor: '#fff'
	},
	postContainer: {
	    backgroundColor: 'white',
	    margin: 5,
	    elevation: 1,
	    borderWidth: 0,
	    borderRadius: 3,
	    shadowColor: '#777',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8
	},
	coverImage: {
	    flex: 1,
	    height: 200,
	    width: null
	},
	contentContainer: {
		padding: 10
	},
	titleText:{
	    fontSize: 26,
	    color: '#333',
	    textAlign: 'left',
	    marginBottom: 10
	},
	subInfoContainer: {
	    marginBottom: 10,
	    flexDirection: 'column',
	    justifyContent: 'space-between'
	},
	date: {
	    color: '#9b9b9b'
	},
	rate: {
		position: 'absolute',
		color: '#9b9b9b',
		bottom: 8,
		right: 0
	},
	rateImage: {
		height: 15, 
		width: 20, 
		resizeMode: 'contain', 
		marginTop: 3
	},
	divider: {
		width: 40, 
		borderTopWidth: 6, 
		borderColor: '#4A4A4A', 
		marginTop: 10
	},
	contentText: {
		color: '#333',
	    marginBottom: 10
	},
	more: {
		color: '#4A4A4A',
		marginBottom: 10,
		textAlign: 'right'
	}
});

module.exports = styles;