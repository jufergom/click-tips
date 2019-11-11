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

    //Searches the user and password in array and redirects to home component, creates cookies
    login = async () => {
        found = false;
        for (index = 0; index < global.users.length; index++) {
            if(this.state.email == global.users[index].email && this.state.password == global.users[index].password) {
                found = true;
                try {
                    await AsyncStorage.setItem('name', global.users[index].name);
                    await AsyncStorage.setItem('email', global.users[index].email);
                    await AsyncStorage.setItem('type', global.users[index].type);
                    if(global.users[index].type == 'Professional') {
                        AsyncStorage.setItem('profession', global.users[index].profession);
                    }
                    this.props.navigation.navigate('Home');
                }
                catch(error) {
                    console.log("Got an error");
                    console.log(error);
                }
            }
        }
        if(!found)
            alert('Usuario y/o contraseña incorrectos');
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
