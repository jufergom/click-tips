import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text, Image } from 'react-native-elements';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.getParam('name', 'name'),
            profession: props.navigation.getParam('profession', 'profession'),
            email: props.navigation.getParam('email', 'email')
        };
    }

    render() {
        return (
            <View>
                <ListItem
                    leftAvatar={{
                        title: 'Avatar',
                        source: { uri: 'https://banner2.cleanpng.com/20180410/ewq/kisspng-rendering-github-smile-emoji-5acc7bd86d37a8.4792946515233504884474.jpg'},
                        size: 'xlarge'
                    }}
                    title={this.state.name}
                    subtitle={this.state.profession}
                    chevron
                />
                <Text h4>Email: {this.state.email}</Text>
                <Image
                    source={ require('../img/logo.png') }
                    style={{ width: 300, height: 300 }}
                    containerStyle={{ marginTop: 50 }}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    buttons: {
        width: 300,
        marginTop: 40
    }
  });
