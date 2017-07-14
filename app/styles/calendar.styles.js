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
	}
});

module.exports = styles;