import React from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native'
import { Button, Tile, PricingCard, Text, Avatar } from 'react-native-elements';

export class DocumentScreen extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
          image: props.navigation.getParam('image', 'image link'),
          title: props.navigation.getParam('title', 'title'),
          description: props.navigation.getParam('description', 'description'),
          source: props.navigation.getParam('source', 'source'),
          author: props.navigation.getParam('author', 'author'),
          price: props.navigation.getParam('price', 'price'),
          free: false
       }
   }

   /*Search for the user's name in the global users array, in order
   to pass all the professional's info to profile component, and go there */
   seeProfessionalProfile() {
     for(i = 0; i < global.users.length; i++) {
       if(global.users[i].name == this.state.author) {
         this.props.navigation.navigate('ProfessionalProfile', {
           name: global.users[i].name,
           profession: global.users[i].profession,
           email: global.users[i].email
         });
       }
     }
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
           <Text h4>Autor: {this.state.author}</Text>

           <Button
              title="Ver perfil del autor"
              onPress={() => {this.seeProfessionalProfile()}}
           />
           <Text>{this.state.description}</Text>
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
    }
});
