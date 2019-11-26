import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Picker, View, ScrollView } from 'react-native';
import { Input, Button, Image, Text } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

export default class EditProfessionalProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            type: '',
            profession: '',
            icon: '',
            cv: '',
            loading: false,
            loadingIcon: false,
            loadingCV: false
        }
    }

    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
        fetch(url+'/api/users/'+this.props.navigation.getParam('email', 'email'))
        .then(response => response.json())
        .then(response => {
            this.setState({
                name: response[0].name,
                password: response[0].password,
                type: response[0].type,
                profession: response[0].profession
            });
        })
        .catch(error => console.log(error))
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //Edits all non file user info
    updateUserInfo = () => {
        this.setState({loading: true});
        let data = {
            name: this.state.name,
            password: this.state.password,
            type: this.state.type,
            profession: this.state.profession
        }
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/';
        fetch(url+this.props.navigation.getParam('email', 'email'), {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status == 200) {
                alert('Datos del perfil actualizados con exito');
                this.setState({loading: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar perfil');
                console.log(res);
                this.setState({loading: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loading: false});
        })
    }

    //selects an image from device file system
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
            let file = {
                uri: result.uri,
                name: result.name,
                type: "image/"+fileType
            }
            this.updateImage(file);
        }
    }

    //uploads the image selected up
    updateImage = (file) => {
        this.setState({loadingIcon: true});
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/editIcon/';
        let form = new FormData();
        form.append('icon', file);
        fetch(url+this.props.navigation.getParam('email', 'email'), {
            method: 'PUT',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('Foto de perfil actualizado con exito');
                this.setState({loadingIcon: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar la foto de perfil');
                console.log(res);
                this.setState({loadingIcon: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loadingIcon: false});
        })
    }

    //selects document from file system
    selectDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
            multiple: false
        });
        console.log(result);
        if (result.type !== 'cancel') {
            let file = {
                uri: result.uri,
                name: result.name,
                type: "application/pdf"
            }
            this.updateDocument(file);
        }
    }

    //uploads document that was chosen up
    updateDocument = (file) => {
        this.setState({loadingCV: true});
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/editCV/';
        let form = new FormData();
        form.append('cv', file);
        fetch(url+this.props.navigation.getParam('email', 'email'), {
            method: 'PUT',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('Curriculum actualizado con exito');
                this.setState({loadingCV: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar curriculum');
                console.log(res);
                this.setState({loadingCV: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loadingCV: false});
        })
    }

    changePassword = () => {
        this.props.navigation.navigate('ModifyPasswordView', {
            email: this.props.navigation.getParam('email', 'email')
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
              <ScrollView>
                <Text h4>Mi Perfil</Text>
                <Input
                    name='name'
                    placeholder='Nombre'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'name')}
                    value={this.state.name}
                />
                <Text>Nombre</Text>
                <Input
                    name='profession'
                    placeholder='Profesion'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'profession')}
                    value={this.state.profession}
                />
                <Text>Profesion</Text>
                <Button
                    title="Actualizar"
                    buttonStyle={style.buttons}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    onPress={() => this.updateUserInfo()}
                />
                <View style={style.lineStyle}></View>
                <Button
                    title="Modificar foto de perfil"
                    buttonStyle={style.buttons}
                    loading={this.state.loadingIcon}
                    disabled={this.state.loadingIcon}
                    onPress={() => this.selectImage()}
                />
                <Button
                    title="Modificar curriculum"
                    buttonStyle={style.buttons}
                    loading={this.state.loadingCV}
                    disabled={this.state.loadingCV}
                    onPress={() => this.selectDocument()}
                />
                <Button
                    title="Modificar contraseña"
                    buttonStyle={style.buttons}
                    onPress={() => this.changePassword()}
                />
              </ScrollView>
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
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
   }
});
