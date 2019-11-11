import React from 'react';
import { View, ScrollView, Text, StyleSheet, Linking } from 'react-native'
import { Button, Tile, PricingCard } from 'react-native-elements';

export class DocumentScreen extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
          image: props.navigation.getParam('image', 'image link'),
          title: props.navigation.getParam('title', 'title'),
          description: props.navigation.getParam('description', 'description'),
          source: props.navigation.getParam('source', 'source'),
          author: props.navigation.getParam('author', 'author'),
          price: props.navigation.getParam('price', 'price')
       }
   }

   render() {
       const { navigation } = this.props;
       return(
         <View>
           <Tile
              imageSrc={{uri: this.state.image}}
              title={this.state.title}
              contentContainerStyle={{ height: 70 }}
           >
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text>Autor: {this.state.author}</Text>
              </View>
              <View>
                <Text>{this.state.description}</Text>
              </View>
            </Tile>
            <PricingCard
                color="#4f9deb"
                title="Comprar"
                price={'L. '+this.state.price}
                info={['Contenido completo']}
                button={{ title: 'Adquirir', icon: 'payment' }}
                onButtonPress={ ()=>{ Linking.openURL(this.state.source)}}
            />
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
