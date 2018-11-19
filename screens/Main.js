// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase';
import { List, ListItem } from 'react-native-elements'

const ops = [
    {
        title: 'Meus Eventos',
        icon: 'event',
        goto: 'Eventos',
    },
    {
        title: 'Meus Contatos',
        icon: 'contacts',
        goto: 'Contatos',
    },
    {
        title: 'Teste de NFC',
        icon: 'nfc',
        goto: 'TesteNFC',
    },
]

export default class Main extends React.Component {
    static navigationOptions = {
        headerLeft: null
    }

    state = {
        user: null
    }

    componentDidMount() {
        setInterval(
            () => this.setState({
                user: firebase.auth().currentUser
            }), 1000);
    }

    render() {
        const user = firebase.auth().currentUser
        return (
            <View style={styles.container}>
                <List >
                    {
                        ops.map((item) => (
                            <ListItem
                                key={item.title}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.goto)}
                            />
                        ))
                    }
                </List>
                <Button title="Logout" onPress={() => firebase.auth().signOut()} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
})