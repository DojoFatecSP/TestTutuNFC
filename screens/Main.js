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
        user: null,
        userEventes: [],
        userEventsData: [],
    }

    componentDidMount() {
        setTimeout(
            () => {
                this.setState({user: firebase.auth().currentUser})
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
                    .then(doc => {

                        console.log('consultando os eventos do usuário', doc.data().events)
                        
                        this.setState({userEvents: doc.data().events})

                        
                        doc.data().events.forEach(docRef => {

                            firebase.firestore().collection('events').doc(docRef).get()
                                .then(eventDoc => {
                                    //console.log('consultando dados do eventos', eventDoc.data())
                                    this.setState(prev => ({userEventsData: [eventDoc.data(), ...prev.userEventsData]}))
                                    //this.setState({userEventsData: [eventDoc.data()]})
                                    //userEventsData.push(eventDoc.data())
                                })
                        })


                    }).catch(err => {
                        alert('Ops..... alguma coisa deu ruim com os nossos servidores, por favor tente mais tarde!')
                        console.warn(err)
                    })
            }, 1000);
    }

    render() {
        console.log(this.state.userEventsData)
        return (
            <View style={styles.container}>
                <List >
                    {
                        ops.map((item) => (
                            <ListItem
                                key={item.title}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                                onPress={() => this.props.navigation.navigate(item.goto, {userEventsData: this.state.userEventsData})}
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