import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadMore:{
		marginBottom: 5
	},
	postContainer: {
	    backgroundColor: 'white',
	    margin: 5,
	    elevation: 1,
	    borderWidth: 0,
	    borderRadius: 2,
	    borderBottomWidth: 0,
	},
	coverImage: {
	    resizeMode: 'cover',
	    flex: 1,
	    height: 250,
	    width: null
	},
	titleText:{
	    fontSize: 30,
	    fontWeight : 'bold'
	},
	subInfoContainer: {
	    margin: 5,
	    flexDirection: 'row',
	    justifyContent: 'space-between'
	},
	subText: {
	    fontSize: 12,
	    color: '#B6B5B5'
	},
	contentText: {
	    fontSize: 15,
	    color: '#29293d'
	},
	detailSectionContainer: {
	    margin: 5,
	    alignItems: 'center'
	}
});

module.exports = styles;