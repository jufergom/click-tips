import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            normal: false,
            icon: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
            email: ''
        };
    }

    componentDidMount() {
      let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
      fetch(url+'/api/users/'+global.user)
        .then(response => response.json())
        .then(response => {
            if(response[0].type == 'Professional') {
                this.setState({
                    name: response[0].name,
                    subtitle: response[0].profession,
                    normal: false,
                    icon: url+'/uploads/'+response[0].icon,
                    email: response[0].email
                });
            }
            else {
                this.setState({
                    name: response[0].name,
                    subtitle: response[0].email,
                    normal: true,
                    icon: url+'/uploads/'+response[0].icon,
                    email: response[0].email
                });
            }
        })
        .catch(error => console.log(error))
    }

    //see all the documents that this author has uploaded
    goToMyDocuments = () => {
        this.props.navigation.navigate('MyDocumentsView');
    }

    //navigates to UploadDocument component
    uploadDocument() {
        this.props.navigation.navigate('Upload');
    }

    //navigates to edit profile screen
    editProfile = () => {
        if(this.state.normal) {
            this.props.navigation.navigate('EditNormalProfileView', {
                email: this.state.email
            });
        }
        else {
            this.props.navigation.navigate('EditProfessionalProfileView', {
                email: this.state.email
            });
        }
    }

    render() {
        return (
            <View>
                <ListItem
                    leftAvatar={{
                        title: 'None',
                        source: { uri: this.state.icon},
                        showEditButton: true,
                        onEditPress: () => this.editProfile(),
                        size: 'xlarge'
                    }}
                    title={this.state.name}
                    subtitle={this.state.subtitle}
                    chevron
                />
                {this.state.normal ?
                    <View style={style.container}>
                        <Button
                            title="Ayuda"
                            buttonStyle={style.buttons}
                        />
                    </View>
                       :
                    <View style={style.container}>
                        <Button
                            title="Mis documentos subidos"
                            buttonStyle={style.buttons}
                            onPress={() => this.goToMyDocuments()}
                        />
                        <Button
                            title="Subir documento"
                            buttonStyle={style.buttons}
                            onPress={() => this.uploadDocument()}
                        />
                    </View>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    buttons: {
        width: 300,
        marginTop: 40
    }
  });
