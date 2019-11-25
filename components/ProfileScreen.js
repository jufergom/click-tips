import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text, Image } from 'react-native-elements';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            profession: '',
            email: '',
            icon: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
        };
    }

    componentDidMount() {
      let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
      fetch(url+'/api/users/'+this.props.navigation.getParam('users_email', 'email'))
        .then(response => response.json())
        .then(response => {
          this.setState({
            name: response[0].name,
            profession: response[0].profession,
            email: this.props.navigation.getParam('users_email', 'email'),
            icon: url+'/uploads/'+response[0].icon
          });
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <View>
                <ListItem
                    leftAvatar={{
                        title: 'Avatar',
                        source: { uri: this.state.icon },
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
