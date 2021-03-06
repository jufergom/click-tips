import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Picker, View} from 'react-native';
import { Input, Button, Image, Text } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';

export default class EditDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            category: '',
            loading: false,
            loadingImage: false,
            loadingDocument: false
        }
    }

    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
        fetch(url+'/api/documents/'+this.props.navigation.getParam('id', 'id'))
        .then(response => response.json())
        .then(response => {
            this.setState({
                title: response[0].title,
                description: response[0].description,
                price: response[0].price,
                category: response[0].category
            });
        })
        .catch(error => console.log(error))
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //edits all non file documents info
    updateDocumentInfo = () => {
        this.setState({loading: true});
        let data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category
        }
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents/';
        fetch(url+this.props.navigation.getParam('id', 'id'), {
            method: 'PUT', 
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status == 200) {
                alert('Datos del documento actualizados con exito');
                this.setState({loading: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar documento');
                console.log(res);
                this.setState({loading: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loading: false});
        })
    }

    //selects image from device file system and uploads it
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

    //upload image selected in the function that is up
    updateImage = (file) => {
        this.setState({loadingImage: true});
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents/editImage/';
        let form = new FormData();
        form.append('image', file);
        fetch(url+this.props.navigation.getParam('id', 'id'), {
            method: 'PUT', 
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('Imagen del documento actualizado con exito');
                this.setState({loadingImage: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar documento');
                console.log(res);
                this.setState({loadingImage: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loadingImage: false});
        })
    }

    //selects a document from the device file system
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

    //uploads the chosen file of the function that is up
    updateDocument = (file) => {
        this.setState({loadingDocument: true});
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents/editSource/';
        let form = new FormData();
        form.append('source', file);
        fetch(url+this.props.navigation.getParam('id', 'id'), {
            method: 'PUT', 
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: form
        }).then(res => {
            if(res.status == 200) {
                alert('PDF del documento actualizado con exito');
                this.setState({loadingDocument: false});
                this.props.navigation.pop(2);
            }
            else {
                alert('Error al actualizar documento');
                console.log(res);
                this.setState({loadingDocument: false});
            }
        }).catch(error => {
            alert('Ha ocurrido un error inesperado, intentelo nuevamente');
            console.log(error);
            this.setState({loadingDocument: false});
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
                <Text h4>Informacion del documento</Text>
                <Input
                    name='title'
                    placeholder='Titulo'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'title')}
                    value={this.state.title}
                />
                <Text>Titulo del documento</Text>
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
                <Text>Descripcion del documento</Text>
                <Input
                    name='price'
                    placeholder='Precio en Lempiras'
                    style={{ marginBottom: 20 }}
                    keyboardType={'numeric'}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'price')}
                    value={`${this.state.price}`}
                />
                <Text>Precio en Lempiras</Text>
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
                    title="Actualizar"
                    buttonStyle={style.buttons}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    onPress={() => this.updateDocumentInfo()}
                />
                <View style={style.lineStyle}></View>
                <Button
                    title="Modificar imagen"
                    buttonStyle={style.buttons}
                    loading={this.state.loadingImage}
                    disabled={this.state.loadingImage}
                    onPress={() => this.selectImage()}
                />
                <Button
                    title="Modificar documento"
                    buttonStyle={style.buttons}
                    loading={this.state.loadingDocument}
                    disabled={this.state.loadingDocument}
                    onPress={() => this.selectDocument()}
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
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
   }
});