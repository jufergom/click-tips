import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Linking, Text,
Picker, ScrollView } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

export default class UploadDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            description: '',
            source: '',
            price: '',
            author: '',
            category: '',
            loading: false
        }
    }

    componentDidMount() {
       let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
       fetch(url+'/api/users/'+global.user)
         .then(response => response.json())
         .then(response => this.setState({author: response[0].email}))
         .catch(error => console.log(error))
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //selects item from device file system
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
            this.setState({ image: {
                uri: result.uri,
                name: result.name,
                type: "image/"+fileType
            }});
        }
    }

    //selects document from device file system
    selectDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
            multiple: false
        });
        console.log(result);
        if (result.type !== 'cancel') {
            this.setState({ source: {
                uri: result.uri,
                name: result.name,
                type: "application/pdf"
            }});
        }
    }

    //pushes document info to global documents array
    upload = () => {
        if(this.state.image == '') {
            alert('Selecciona una imagen que describa el documento');
        }
        else if(this.state.source == '') {
            alert('Selecciona el documento que deseas subir');
        }
        else if(this.state.category == 'select') {
            alert('Selecciona una categoria para el documento');
        }
        else if(this.state.title == '') {
            alert('Escribe un titulo para el documento que vas a publicar')
        }
        else if(this.state.title == '') {
            alert('Escribe un titulo para el documento que vas a publicar')
        }
        else if(this.state.description == '') {
            alert('Escribe una descripcion del documento');
        }
        else {
            this.setState({loading: true});
            let form = new FormData();
            let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents';
            form.append('title', this.state.title);
            form.append('description', this.state.description);
            form.append('source', this.state.source);
            form.append('price', this.state.price);
            form.append('image', this.state.image);
            form.append('users_email', this.state.author);
            form.append('category', this.state.category);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            }).then(res => {
                if(res.status == 200) {
                    alert('Documento subido con exito');
                    this.setState({loading: false});
                }
                else {
                    alert('Error al subir el documento documento');
                    this.setState({loading: false});
                    console.log(res);
                }
            })
            .catch(error => {
                alert('Hubo un error inesperado, intentelo de nuevo');
                console.log(error);
                this.setState({loading: false});
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
              <ScrollView>
                <Input
                    name='title'
                    placeholder='Titulo del documento'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'title')}
                    value={this.state.title}
                />
                <Input
                    name='description'
                    placeholder='Descripcion del documento'
                    multiline
                    numberOfLines={3}
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'description')}
                    value={this.state.description}
                />
                <Input
                    name='price'
                    placeholder='Precio en Lempiras'
                    style={{ marginBottom: 20 }}
                    keyboardType={'numeric'}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'price')}
                    value={this.state.price}
                />
                <Picker
                    selectedValue={this.state.category}
                    style={{height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({category: itemValue});
                    }}>
                    <Picker.Item label="Selecciona una categoria ..." value="select" />
                    <Picker.Item label="Preguntas Frecuentes" value="Preguntas Frecuentes" />
                    <Picker.Item label="Actividades y Juegos" value="Actividades y Juegos" />
                </Picker>
                <Button
                    title="Seleccionar imagen"
                    buttonStyle={style.buttons}
                    onPress={() => this.selectImage()}
                />
                <Button
                    title="Seleccionar documento pdf"
                    buttonStyle={style.buttons}
                    onPress={() => this.selectDocument()}
                />
                <Button
                    title="Subir documento"
                    buttonStyle={style.buttons}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    onPress={() => this.upload()}
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
    }
});
