import React from 'react';
import { View, ScrollView } from 'react-native'
import { Card, Button } from 'react-native-elements';

export class HomeScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerRight: (
          <Button
            onPress={() => navigation.navigate('Profile')}
            title="Ver Perfil"
          />
        ),
    });


    render() {
        return(
            <View>
                <ScrollView>
                    <Card
                        title='Preguntas Frecuentes'
                        image={require('../img/question.png')}
                        imageStyle={{width: 200, height: 400}}
                    >
                        <Button
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0}
                            }
                            title='Entrar'
                            onPress={() => this.props.navigation.navigate('Questions')}
                        />
                    </Card>
                    <Card
                        title='Actividades y Juegos'
                        image={require('../img/kite.png')}
                        imageStyle={{width: 200, height: 400}}
                    >
                        <Button
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0}
                            }
                            title='Entrar'
                            onPress={() => this.props.navigation.navigate('Games')}
                        />
                    </Card>
                    <Card
                        title='Tip del dia'
                        image={require('../img/idea.png')}
                        imageStyle={{width: 200, height: 400}}
                    >
                        <Button
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0}
                            }
                            title='Entrar'
                            onPress={() => this.props.navigation.navigate('Tips')}
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }
}
