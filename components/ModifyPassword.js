import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class ModifyPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            type: '',
            profession: '',
            paramPassword: '',
            oldPassword: '',
            password: '',
            loading: false
        }
    }

    //just because the api needs all this data in put request
    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
        fetch(url+'/api/users/'+this.props.navigation.getParam('email', 'email'))
        .then(response => response.json())
        .then(response => {
            this.setState({
                name: response[0].name,
                paramPassword: response[0].password,
                type: response[0].type,
                profession: response[0].profession
            });
        }).catch(error => console.log(error))
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //Sends a put request to api rest, if requests status code is 200, changes password
    changePassword = () => {
        this.setState({loading: true});
        if(this.state.paramPassword == this.state.oldPassword) {
            let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/';
            let data = {
                name: this.state.name, 
                password: this.state.password,
                type: this.state.type,
                profession: this.state.profession
            };
            fetch(url+this.props.navigation.getParam('email', 'email'), {
                method: 'PUT', 
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status == 200) {
                    alert('Contraseña editada con exito');
                }
                else {
                    alert('Error al editar la contraseña');
                }
            }).catch(error => {
                alert('Ha ocurrido un error inesperado');
                this.setState({loading: false});
                console.log(error);
            })
        }
        else {
            alert('La contraseña anterior brindada no es correcta');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
                <Input
                    name='oldPassword'
                    placeholder='Contraseña anterior'
                    style={{ marginBottom: 20 }}
                    secureTextEntry={true}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'oldPassword')}
                    value={this.state.oldPassword}
                />
                <Input
                    name='password'
                    placeholder='Nueva contraseña'
                    style={{ marginBottom: 20 }}
                    secureTextEntry={true}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'password')}
                    value={this.state.password}
                />
                <Button
                    title="Cambiar contraseña"
                    buttonStyle={style.buttons}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    onPress={() => this.changePassword()}
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
