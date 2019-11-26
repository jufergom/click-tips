import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

export default class MyDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            loading: false
        }
    }

    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents/author/';
        fetch(url+global.user)
        .then(response => response.json())
        .then(response => {
            this.setState({documents: response});
        })
        .catch(error => console.log(error))
    }

    goToEditDocument = (id) => {
        this.props.navigation.navigate('EditDocumentView', {
            id: id
        });
    }

    confirmDelete = (id) => {
        // Works on both iOS and Android
        Alert.alert(
            'Alert',
            '¿Desea eliminar este documento?',
            [
                { 
                    text: 'Eliminar', 
                    onPress: () => this.deleteDocument(id)
                },
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false }
        );
    }

    deleteDocument = (id) => {
        this.setState({loading: true});
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents/'+id;
        fetch(url, {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status == 200) {
                //delete document from array 
                let documents = this.state.documents;
                let filteredDocuments = documents.filter(document => {
                    return document.id_documents !== id;
                });
                //set new array to state
                this.setState({
                    documents: filteredDocuments
                });
                //Show user a success Messages
                alert('Documento eliminado con exito');
                this.setState({loading: false});
            }
            else {
                alert('Error al eliminar el documento');
                this.setState({loading: false});
            }
        })
        .catch(error => {
            alert('Ha ocurrido un error inesperado al borrar el documento');
            console.log(error);
            this.setState({loading: false});
        })
    }

    generate = () => {
      return this.state.documents.map(document => (
        <Card
            title={document.title}
            image={{uri: "http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/uploads/"+document.image}}
            imageStyle={{width: 200, height: 400}}
            key={document.id_documents}
        >
            <Button
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 4}
                }
                title='Editar'
                onPress={() => this.goToEditDocument(document.id_documents)}
            />
            <Button
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0}
                }
                title='Eliminar'
                loading={this.state.loading}
                disabled={this.state.loading}
                onPress={() => this.confirmDelete(document.id_documents)}
            />
        </Card>
      ));
    };

    render() {
        return (
            <View>
                <ScrollView>
                    {this.generate()}
                </ScrollView>
            </View>
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
