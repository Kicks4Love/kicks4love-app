import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	flatList: {
		backgroundColor: '#fff',
	},
	postContainer: {
		borderWidth: 3,
		height: 450
	},
	postContentTitle: {
		textAlign:'center',
		textDecorationColor: '#000000',
		fontSize: 30,
		fontWeight: '500',
		lineHeight: 28
	},
	postContentDate: {
		borderRadius: 4,
		borderWidth: 4,
		textAlign:'center',
		marginTop: 15,
		fontSize: 18,
		fontWeight: '500'
	},
	titleText:{
	    fontSize: 26,
	    textAlign: 'left',
	    marginBottom: 10
	},
	coverImage:{
		top: 8,
		height: 200,
	    width: null
	},
	ratingImage: {
		height: 18,
		width: 26,
		marginRight: 3
	}
});

module.exports = styles;