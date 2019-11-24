import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, SocialIcon } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    //detele cookies
    async componentDidMount() {
        try {
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('type');
            await AsyncStorage.removeItem('profession');
        } catch(error) {
            console.log(error);
        }
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //Sends a post request to api rest, if requests status code is 200, redirect to homepage
    login = () => {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/login';
        let data = {email: this.state.email, password: this.state.password};

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status == 200) {
                global.user = this.state.email;
                this.props.navigation.navigate('Home');
            }
            else {
                alert('Usuario y/o contraseña incorrectos');
            }
        })
        .catch(error => alert('Ha ocurrido un error al iniciar sesion'))
    }

    //go to home screen skipping login
    entrarDeOne() {
        this.props.navigation.navigate('Home');
    }

    //go to sign up screen
    goToSignUp() {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
                <Image
                    source={ require('../img/logo.png') }
                    style={{ width: 300, height: 300 }}
                    containerStyle={{ marginTop: 50 }}
                />
                <Input
                    name='email'
                    placeholder='Email'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'email')}
                    value={this.state.username}
                />
                <Input
                    name='password'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'password')}
                    value={this.state.password}
                />
                <Button
                    title="Sign In"
                    buttonStyle={style.buttons}
                    onPress={() => this.login()}
                />
                <Button
                    title="Sign Up"
                    buttonStyle={style.buttons}
                    onPress={() => this.goToSignUp()}
                />
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    style={style.buttons}
                    onPress={() => this.entrarDeOne()}
                />

                <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google'
                    style={style.buttons}
                    onPress={() => this.entrarDeOne()}
                />
            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        width: 300,
        marginTop: 20
    }
});
