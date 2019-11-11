import React from 'react';
import { StyleSheet, KeyboardAvoidingView, AsyncStorage,
Picker } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, SocialIcon } from 'react-native-elements';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: '',
            profession: ''
        }
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //pushes new user to global array of users
    signIn = () => {
        if(this.state.profession == 'select') {
            alert('Selecciona un rol antes de crear un usuario');
        }
        else {
            global.users.push({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                profession: this.state.profession
            });
            alert('Usuario creado con exito');
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
                <Input
                    name='name'
                    placeholder='Nombre'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'name')}
                    value={this.state.name}
                />
                <Input
                    name='email'
                    placeholder='Email'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'email')}
                    value={this.state.email}
                />
                <Input
                    name='password'
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'password')}
                    value={this.state.password}
                />
                <Picker
                    selectedValue={this.state.type}
                    style={{height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({type: itemValue})
                    }>
                    <Picker.Item label="Selecciona tu rol ..." value="select" />
                    <Picker.Item label="Parent" value="Parent" />
                    <Picker.Item label="Professional" value="Professional" />
                </Picker>
                <Input
                    name='profession'
                    placeholder='Profesion'
                    editable={this.state.TextInputDisableHolder}
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'profession')}
                    value={this.state.profession}
                />
                <Button
                    title="Sign Up"
                    buttonStyle={style.buttons}
                    onPress={() => this.signIn()}
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
