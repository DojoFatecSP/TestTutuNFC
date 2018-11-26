import React, { Component } from 'react'
import { StyleSheet, Platform, Text, View, Button, TextInput } from 'react-native'
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import firebase from 'react-native-firebase';


const ativado = Platform.select({
    ios: '',
    android: 'NFC está ativado:'
})

const plataforma = Platform.select({
    ios: 'iPhone',
    android: 'Android'
})

export default class TesteNFC extends Component {
    state = {
        supported: null,
        enabled: null,
        been: false,
        extra: '',
        user: null,
    }

    componentDidMount() {
        this.setState({user: firebase.auth().currentUser})
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
            this.setState({ enabled })
        }).catch(err => {
            console.log(err)
        })

        NfcManager.registerTagEvent(tag => {
            console.log('Tag Discovered', tag);
        }, 'Hold your device over the tag', true)

    }

    componentWillUnmount() {
        NfcManager.unregisterTagEvent()
        NfcManager.stop()

    }

    handlePress = () => {
        let bytes = Ndef.encodeMessage([
            Ndef.textRecord("Novo Contato recebido do Tutu Verde"),
            Ndef.textRecord(this.state.user.email),
            Ndef.textRecord(this.state.extra),
            //Ndef.uriRecord("http://nodejs.org"),
        ]);

        NfcManager.setNdefPushMessage(bytes)
            .then(() => {
                console.log('ready to beam')
                this.setState({ been: true })
            })
            .catch(err => {
                console.warn(err)
                alert('Erro')
            })
    }

    handleCancel = () => {
        NfcManager.setNdefPushMessage(null)
            .then(() => {
                console.log('beam cancelled')
                this.setState({ been: false })
            })
            .catch(err => console.warn(err))
    }

    render() {
        return (
            <View>
                <Text>TesteNFC</Text>
                <Text> Plataforma: {plataforma} </Text>
                <Text> NFC é suportado: {this.state.supported ? 'SIM' : 'Não'} </Text>
                <Text>{ativado} {this.state.enabled ? 'SIM' : 'Não'} </Text>
                <Text> Transferir informações Extra: </Text><TextInput multiline={true} style={styles.tinput} value={this.state.extra} onChangeText={(extra) => this.setState({ extra })} />
                {this.state.enabled && <Button onPress={this.handlePress} title='Transferir contato' />}
                <Text> ------- </Text>
                {this.state.been && <Text>Aproxime de outro celular para transferir o seu contato</Text>}
                {this.state.enabled && <Button onPress={this.handleCancel} title='Cancelar' />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tinput: {
        borderWidth: 1,
        color: 'green',
        borderColor: '#7a42f4',
        margin: 3,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
})