import React from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native'
import { Button, Tile, PricingCard, Text, Avatar } from 'react-native-elements';

export class DailyTips extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
          image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
          title: '',
          description: '',
          source: '',
          author: '',
          price: '¡Gratis!'
       }
   }

   componentDidMount() {
       let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com';
       fetch(url+'/api/documents')
         .then(response => response.json())
         .then(response => {
             let limit = response.length;
             let randomNumber = Math.floor(Math.random() * limit);
             this.setState({
                image: url+'/uploads/'+response[randomNumber].image,
                title: response[randomNumber].title,
                description: response[randomNumber].description,
                source: url+'/uploads/'+response[randomNumber].source,
             });
             fetch(url+'/api/users/'+response[randomNumber].users_email)
               .then(response => response.json())
               .then(response => {
                   this.setState({author: response[0].name})
                   //this.setState({author: response[0].name});
               })
               .catch(error => console.log(error))
             //this.setState({author: response[0].name});
         })
         .catch(error => console.log(error))
   }

   /*Passes users email (primary key on db) to profile component and goes there*/
   seeProfessionalProfile() {
        this.props.navigation.navigate('ProfessionalProfile', {
            users_email: this.props.navigation.getParam('users_email', 'email')
        });
   }

   download() {
      alert('Tip del dia obtenido con exito');
      Linking.openURL(this.state.source);
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
              title="Obtener"
              price={this.state.price}
              info={['Contenido completo']}
              button={{ title: 'Adquirir' }}
              onButtonPress={ ()=> {this.download()}}
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
