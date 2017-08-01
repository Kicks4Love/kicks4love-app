import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	container: {
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: '#fff'
	},
	contactContainer: {
		marginTop: 15,
		marginBottom: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	label: {
		color: '#333'
	},
	email: {
		color: '#333',
		marginTop: 5,
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	panel: {
		elevation: 1,
        borderWidth: 0,
        borderRadius: 3,
        shadowColor: '#777',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        margin: 10
	},
	boldText: {
		fontWeight: 'bold'
	},
	linkText: {
		color: '#337ab7'
	},
	underlineText: {
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid'
	}
});

module.exports = styles;