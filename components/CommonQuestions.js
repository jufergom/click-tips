import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';

export default class CommonQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: []
        }
    }

    componentDidMount() {
        let url = 'http://clicktips-env.7ngfdmmcev.us-east-1.elasticbeanstalk.com/api/documents';
        fetch(url)
        .then(response => response.json())
        .then(response => {
            for(i = 0; i < response.length; i++) {
                if(response[i].category == "Preguntas Frecuentes") {
                    const list = [...this.state.documents, response[i]];
                    this.setState({documents: list});
                }
            }
        })
        .catch(error => console.log(error))
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
                    marginBottom: 0}
                }
                title='Ver mas'
                onPress={() => {
                    this.props.navigation.navigate('DocumentView', {
                        id: document.id_documents,
                        title: document.title,
                        description: document.description,
                        source: document.source,
                        price: document.price,
                        image: document.image,
                        users_email: document.users_email,
                        category: document.category
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
