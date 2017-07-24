import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
  	},
  	loadMore: {
  		marginTop: 5,
  		marginBottom: 10
  	},
  	loadMoreText: {
		marginTop: 5,
		textAlign: 'center',
		fontSize: 12
	}
});

export default class Index extends Component {

	render() {
		if (this.props.type == 'initial') {
			return (
				<View style={styles.container}>
          			<ActivityIndicator animating={true} size="large" />
        		</View>
        	);
		}

		return (
			<View style={styles.loadMore}>
		        <ActivityIndicator animating={true}/>
		        <Text style={styles.loadMoreText}>{this.props.text}</Text>
		    </View>
		);
	}

}