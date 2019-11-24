import React from 'react';
import { StyleSheet, KeyboardAvoidingView, AsyncStorage,
Picker, View, ActivityIndicator } from 'react-native';
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
            showMoreOptions: false,
            icon: {
                uri: '',
                name: '',
                type: ''
            },
            cv: {
                uri: '',
                name: '',
                type: ''
            },
            loading: false
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
    }

    selectCV = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
            multiple: false
        });
        console.log(result);
        if (result.type !== 'cancel') {
            this.setState({ cv: {
                uri: result.uri,
                name: result.name,
                type: "application/pdf"
            }});
        }
    }

    //Sends data to server
    signUp = () => {
        this.setState({loading: true}, () => {
            console.log(this.state.loading);
            if(this.state.type == 'select') {
                alert('Selecciona un rol antes de crear un usuario');
                this.setState({loading: false});
            }
            else if(this.state.icon.name == '') {
                alert('Selecciona una foto de perfil antes de crear tu usuario');
                this.setState({loading: false});
            }
            else if(this.state.type == 'Professional' && this.state.cv.name == '') {
                alert('Debes proporcionar tu curriculum para poder crear tu usuario');
                this.setState({loading: false});
            }
            else {
                if(this.state.type == 'Parent') {
                    this.addParent();
                }
                else {
                    this.addProfessional();
                }
            }
        });
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
                this.setState({loading: false});
            }
            else {
                alert('Error al crear usuario, probablemente ya exista otro usuario con ese email');
                this.setState({loading: false});
            }
        })
        .catch(error => {
            alert('Hubo un error inesperado, intentelo de nuevo');
            console.log(error);
            this.setState({loading: false});
        })
    }

    addProfessional = () => {
        let form = new FormData();
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users';
        form.append('email', this.state.email);
        form.append('name', this.state.name);
        form.append('password', this.state.password);
        form.append('type', this.state.type);
        form.append('profession', this.state.profession);
        form.append('icon', this.state.icon);
        form.append('cv', this.state.cv);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('Usuario creado con exito');
                this.setState({loading: false});
            }
            else {
                alert('Error al crear usuario, probablemente ya exista otro usuario con ese email');
                console.log(res);
                this.setState({loading: false});
            }
        })
        .catch(error => {
            alert('Hubo un error inesperado, intentelo de nuevo');
            console.log(error);
            this.setState({loading: false});
        })
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
                <Input
                    name='profession'
                    placeholder='Profesion'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'profession')}
                    value={this.state.profession}
                />
                <Picker
                    selectedValue={this.state.type}
                    style={{height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({type: itemValue});
                        if(itemValue == 'Professional') {
                            this.setState({showMoreOptions: true});
                        }
                        else {
                            this.setState({showMoreOptions: false});
                        }
                    }}>
                    <Picker.Item label="Selecciona tu rol ..." value="select" />
                    <Picker.Item label="Parent" value="Parent" />
                    <Picker.Item label="Professional" value="Professional" />
                </Picker>
                <Button
                    title="Seleccionar foto de perfil"
                    buttonStyle={style.buttons}
                    onPress={() => this.selectImage()}
                />
                {this.state.showMoreOptions ?
                  <View>
                      <Button
                          title="Subir curriculum"
                          buttonStyle={style.buttons}
                          onPress={() => this.selectCV()}
                      />
                  </View>
                       :
                    <View>
                    </View>
                }
                <Button
                    title="Sign Up"
                    buttonStyle={style.buttons}
                    onPress={() => this.signUp()}
                />
                <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff" />
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
