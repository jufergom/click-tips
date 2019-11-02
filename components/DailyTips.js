import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class DailyTips extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={style.container}>
                <Text>Tip del dia</Text>
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