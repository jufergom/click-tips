import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Linking, Text,
Picker } from 'react-native';
import { Input, Button, Image, Icon } from 'react-native-elements';

export default class PaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            number: '',
            cvv: '',
            month: '',
            year: '',
            source: props.navigation.getParam('source', 'source')
        }
    }

    handleChange = (event, name) => {
        const { text } = event.nativeEvent;
        this.setState(() => ({[name]: text}));
    }

    //redirects to document link
    pay = () => {
        alert('Pago realizado con exito');
        this.props.navigation.goBack(null);
        Linking.openURL(this.state.source);
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container}>
                <Input
                    name='owner'
                    placeholder='Propietario de la tarjeta'
                    style={{ marginBottom: 20 }}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'owner')}
                    value={this.state.owner}
                />
                <Icon
                    name='cc-visa'
                    type='font-awesome'
                    color='#517fa4'
                />
                <Icon
                    name='cc-mastercard'
                    type='font-awesome'
                    color='#517fa4'
                />
                <Input
                    name='number'
                    placeholder='Numero de la tarjeta'
                    style={{ marginBottom: 20 }}
                    keyboardType={'numeric'}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'number')}
                    value={this.state.number}
                />
                <Input
                    name='cvv'
                    placeholder='CVV'
                    style={{ marginBottom: 20 }}
                    keyboardType={'numeric'}
                    placeholderTextColor='#36486b'
                    onChange={(event) => this.handleChange(event, 'cvv')}
                    value={this.state.cvv}
                />
                <Text>
                    Fecha de Expiracion
                </Text>
                <Picker
                    selectedValue={this.state.month}
                    style={{height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({month: itemValue})
                    }>
                    <Picker.Item label="Enero" value="january" />
                    <Picker.Item label="Febrero" value="february" />
                    <Picker.Item label="Marzo" value="march" />
                    <Picker.Item label="Abril" value="april" />
                    <Picker.Item label="Mayo" value="may" />
                    <Picker.Item label="Junio" value="june" />
                    <Picker.Item label="Julio" value="july" />
                    <Picker.Item label="Agosto" value="august" />
                    <Picker.Item label="Septiembre" value="september" />
                    <Picker.Item label="Octubre" value="october" />
                    <Picker.Item label="Noviembre" value="november" />
                    <Picker.Item label="Diciembre" value="december" />
                </Picker>
                <Picker
                    selectedValue={this.state.year}
                    style={{height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({year: itemValue})
                    }>
                    <Picker.Item label="2019" value="2019" />
                    <Picker.Item label="2020" value="2020" />
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2025" value="2025" />
                    <Picker.Item label="2026" value="2026" />
                </Picker>
                <Button
                    title="Pagar"
                    buttonStyle={style.buttons}
                    onPress={() => this.pay()}
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
