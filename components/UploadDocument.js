import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Linking, Text,
Picker, AsyncStorage } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';

export default class UploadDocument extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           image: '',
           title: '',
           description: '',
           source: '',
           price: '',
           author: ''
       }
   }

   async componentDidMount() {
       try {
           const author = await AsyncStorage.getItem('name');
           this.setState({author: author});
       } catch(error) {
           console.log(error);
       }
   }

   handleChange = (event, name) => {
       const { text } = event.nativeEvent;
       this.setState(() => ({[name]: text}));
   }

   //pushes document info to global documents array
   upload = () => {
       global.documents.push({
         id: global.documents.length,
         image: this.state.image,
         title: this.state.title,
         description: this.state.description,
         source: this.state.source,
         author: this.state.author,
         price: this.state.price
       });
       alert('Documento subido con exito!');
       this.props.navigation.goBack(null);
   }

   render() {
       return (
           <KeyboardAvoidingView style={style.container}>
               <Input
                   name='image'
                   placeholder='Imagen de muestra (link)'
                   style={{ marginBottom: 20 }}
                   placeholderTextColor='#36486b'
                   onChange={(event) => this.handleChange(event, 'image')}
                   value={this.state.image}
               />
               <Input
                   name='title'
                   placeholder='Titulo'
                   style={{ marginBottom: 20 }}
                   placeholderTextColor='#36486b'
                   onChange={(event) => this.handleChange(event, 'title')}
                   value={this.state.title}
               />
               <Input
                   name='description'
                   placeholder='Description'
                   multiline
                   numberOfLines={3}
                   style={{ marginBottom: 20 }}
                   placeholderTextColor='#36486b'
                   onChange={(event) => this.handleChange(event, 'description')}
                   value={this.state.number}
               />
               <Input
                   name='source'
                   placeholder='Link del documento (Google Drive)'
                   style={{ marginBottom: 20 }}
                   placeholderTextColor='#36486b'
                   onChange={(event) => this.handleChange(event, 'source')}
                   value={this.state.source}
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
               <Button
                   title="Subir documento"
                   buttonStyle={style.buttons}
                   onPress={() => this.upload()}
               />
               <Image
                   source={ require('../img/logo.png') }
                   style={{ width: 300, height: 300 }}
                   containerStyle={{ marginTop: 50 }}
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
