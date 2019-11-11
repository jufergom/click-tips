import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';

export default class CommonQuestions extends React.Component {
    constructor(props) {
        super(props);
    }

    generate = () => {
      return global.documents.map(document => (
        <Card
            title={document.title}
            image={{uri: document.image}}
            imageStyle={{width: 200, height: 400}}
            key={document.id}
        >
          <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0}
              }
              title='Ver mas'
              onPress={() => {
                this.props.navigation.navigate('DocumentView', {
                  image: document.image,
                  title: document.title,
                  author: document.author,
                  description: document.description,
                  price: document.price,
                  source: document.source
                });
              }}
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
