import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	monthSwiperContainer: {
		alignItems: 'center'
	},
	monthSwiper: {
		overflow: 'visible'
	},
	monthSwiperButton: {
		color: '#999', 
		fontSize: 18, 
		fontWeight: '100'
	},
	monthContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	selectedMonth: {
		fontSize: 23,
		fontWeight: 'bold'
	},
	noData: {
		textAlign: 'center'
	},
	container: {
	    marginBottom: 10
	},
	coverImage: {
	    resizeMode: 'cover',
	    flex: 1,
	    height: 220,
	    width: null
	},
	cover: {
	    backgroundColor: 'rgba(255, 255, 255, .8)',
	    flex: 1,
	    padding: 15
	},
	coverRemoved: {
	    backgroundColor: 'rgba(255, 255, 255, 0)',
	    height: 0,
	    borderWidth: 0
	},
	coverTitle: {
	    padding: 5,
	    fontWeight: 'bold',
	    marginTop: 35,
	    borderWidth: 2,
	    fontSize: 22,
	    textAlign: 'center'
	},
	coverPrice: {
	    position: 'absolute',
	    bottom: 15,
	    right: 15,
	    fontSize: 18
	},
	date: {
	    textAlign: 'center',
	    marginTop: 5
	}
});

module.exports = styles;