import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	main: {
		backgroundColor: '#fff',
		flex: 1
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
	text: {
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
	}
});

module.exports = styles;