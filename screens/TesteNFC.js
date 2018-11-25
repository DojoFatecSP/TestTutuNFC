import React, { Component } from 'react'
import { StyleSheet, Platform, Text, View, Button } from 'react-native'
import NfcManager from 'react-native-nfc-manager';


const ativado = Platform.select({
    ios: '',
    android: 'NFC está ativado:'
})

export default class TesteNFC extends Component {
    state = {
        supported: null,
        enabled: null,
    }

    componentDidMount() {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        }).then(result => {
            console.log('start OK', result);
            this.setState({ supported: true })
        }).catch(err => {
            console.log('Aparelho não suporta NFC', err);
            //this.setState({supported: false})
        })
    
        NfcManager.isEnabled().then(enabled => {
            this.setState({enabled})
        }).catch(err => {
            console.log(err)  
        })

    } 
 
    componentWillUnmount() {
        NfcManager.stop() 
    }

    render() {
        return (
            <View>
                <Text>TesteNFC</Text>
                <Text> NFC é suportado: {this.state.supported ? 'SIM' : 'Não'} </Text>
                <Text>{ativado} {this.state.enabled ? 'SIM' : 'Não'} </Text>
            </View>
        )
    }
}