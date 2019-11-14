import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subtitle: '',
            normal: false
        };
    }

    async componentDidMount() {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            const type = await AsyncStorage.getItem('type');
            //this.setState({type: type});
            if(type == 'Professional') {
                const profession = await AsyncStorage.getItem('profession');
                this.setState({
                    name: name,
                    subtitle: profession,
                    normal: false
                });
            }
            else {
                this.setState({
                    name: name,
                    subtitle: email,
                    normal: true
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    //navigates to UploadDocument component
    uploadDocument() {
      this.props.navigation.navigate('Upload');
    }

    render() {
        return (
            <View>
                <ListItem
                    leftAvatar={{
                        title: 'None',
                        source: { uri: 'https://banner2.cleanpng.com/20180410/ewq/kisspng-rendering-github-smile-emoji-5acc7bd86d37a8.4792946515233504884474.jpg'},
                        showEditButton: true,
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
                        <Button
                            title="Recibos y Compras"
                            buttonStyle={style.buttons}
                        />
                    </View>
                       :
                    <View style={style.container}>
                        <Button
                            title="Hoja de vida"
                            buttonStyle={style.buttons}
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
