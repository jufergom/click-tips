import React from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native'
import { Button, Tile, PricingCard, Text, Avatar } from 'react-native-elements';

export class DocumentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/uploads/'+props.navigation.getParam('image', 'image link'),
            title: props.navigation.getParam('title', 'title'),
            description: props.navigation.getParam('description', 'description'),
            source: 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/uploads/'+props.navigation.getParam('source', 'source'),
            author: '',
            price: props.navigation.getParam('price', 'price'),
            free: false
        }
    }

    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/users/'+this.props.navigation.getParam('users_email', 'email');
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({author: response[0].name});
            })
            .catch(error => console.log(error))
    }

    /*Passes users email (primary key on db) to profile component and goes there*/
    seeProfessionalProfile() {
            this.props.navigation.navigate('ProfessionalProfile', {
                users_email: this.props.navigation.getParam('users_email', 'email')
            });
    }

    goToPayment() {
        this.props.navigation.navigate('Payment', {
        source: this.state.source
        });
    }

    render() {
        const { navigation } = this.props;
        return(
            <ScrollView>
            <Tile
                imageSrc={{uri: this.state.image}}
                title={this.state.title}
                contentContainerStyle={{ height: 70 }}
            >
            </Tile>
            <View style={style.marginBottom}></View>
            <Button
                title="Ver perfil del autor"
                onPress={() => {this.seeProfessionalProfile()}}
            />
            <Text h4>Autor: {this.state.author}</Text>
            <View style={style.marginTop}></View>

            <Text>{this.state.description}</Text>
            <View style={style.marginBottom}></View>
            <PricingCard
                color="#4f9deb"
                title="Comprar"
                price={'L. '+this.state.price}
                info={['Contenido completo']}
                button={{ title: 'Adquirir', icon: 'payment' }}
                onButtonPress={ ()=> {this.goToPayment()}}
            />
            </ScrollView>
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
    marginBottom: {
        marginBottom: 25
    },
    marginTop: {
        marginTop: 20
    }
});
