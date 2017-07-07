import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import Menu from './components/Menu';

const styles = require('./index.styles');

class Index extends Component {
  static navigationOptions = { 
    title: 'Latest News',
    headerStyle: { backgroundColor: '#f8f8f8'},
    headerTitleStyle: { color: '#777'},
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'Home',
      isOpen: false
    };
  }

  toggle() {
    this.setState((previousState) => {
      return { isOpen: !previousState.isOpen };
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      selectedItem: item,
      isOpen: false
    });
  }
  
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    // TODO: make header state-alone component @leonma333
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>

        <View style={styles.container}>
          <View style={styles.header}>
            <Button title={'toggle'} onPress={ () => this.toggle() }>
            </Button>
          </View>
          <Text style={styles.welcome}>
            Welcome to Kicks4Love Mobile App!
          </Text>
          <Text style={styles.instructions}>
            Currently selected item: {this.state.selectedItem}
          </Text>

        </View>
      </SideMenu>
    );
  }
}

const Kicks4LoveApp = StackNavigator({
  Home: { screen: Index }
});

export default Kicks4LoveApp;