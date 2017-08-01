import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 0.9,
        padding: 10,
        color: '#333',
        fontWeight: 'bold'
    },
    button: {
        flex: 0.1
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.icons = {
            up: <Icon name='caret-up' size={30} color='#333' />,
            down: <Icon name='caret-down' size={30} color='#333' />
        };
        this.state = {
            title: props.title,
            expanded: true,
            animation: new Animated.Value()
        };
    }

    setMaxHeight(event) {
        this.setState({ maxHeight: event.nativeEvent.layout.height });
    }

    setMinHeight(event) {
        this.setState({ minHeight: event.nativeEvent.layout.height });
    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({ expanded: !this.state.expanded });

        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, { toValue: finalValue }).start();
    }

    render() {
        let icon = this.icons.down;
        if(this.state.expanded) icon = this.icons.up;

        return ( 
            <Animated.View style={[styles.container, { height: this.state.animation }]} >
                <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.toggle.bind(this)}>
                        {icon}
                    </TouchableOpacity>
                </View>
                <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}