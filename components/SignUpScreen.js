import React from 'react';
import { StyleSheet, KeyboardAvoidingView, AsyncStorage,
Picker } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Image, SocialIcon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: '',
            profession: '',
            icon: {
                uri: '',
                name: '',
                type: ''
            },
            cv: {
                uri: '',
                name: '',
                type: ''
            }
        }
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    selectImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: true,
            multiple: false
        });

        if (result.type !== 'cancel') {
            //this.setState({ icon: result});
            console.log(result);
            let nameParts = result.name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            if(fileType === 'jpg') {
                fileType = 'jpeg';
            }
            console.log(fileType);
            this.setState({ icon: {
                uri: result.uri,
                name: result.name,
                type: "image/"+fileType
            }});
        }
    };

    //Sends data to server
    signUp = () => {
        if(this.state.profession == 'select') {
            alert('Selecciona un rol antes de crear un usuario');
        }
        else {
            if(this.state.type === 'Parent') {
                this.addParent();
            }
            else {
                //TODO append cv and profession too
            }
        }

    }

    addParent = () => {
        let form = new FormData();
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/addparent';
        form.append('email', this.state.email);
        form.append('name', this.state.name);
        form.append('password', this.state.password);
        form.append('type', this.state.type);
        form.append('icon', this.state.icon);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('Usuario creado con exito');
            }
            else {
                alert('Ya existe un usuario con este email, por favor intenta con otro');
                console.log(res);
            }
        })
        .catch(error => {
            alert('Hubo un error inesperado, intentelo de nuevo')
        })
    }

    selectCV = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
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
                    title="Select image"
                    buttonStyle={style.buttons}
                    onPress={() => this.selectImage()}
                />
                <Button
                    title="Sign Up"
                    buttonStyle={style.buttons}
                    onPress={() => this.signUp()}
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
