import React from 'react';
import { StyleSheet, Platform, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

 

import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'
import Eventos from './screens/Eventos'
import Contatos from './screens/Contatos'
import TesteNFC from './screens/TesteNFC'

import EventoInfo from './screens/EventoInfo'
import EventoDocs from './screens/EventoDocs'
import EventoParts from './screens/EventoParts'

const EventoNav = createBottomTabNavigator(
    {
        EventoInfo,
        EventoDocs,
        EventoParts,
    }
)

const AppNavigator = createStackNavigator(
    {
        Loading,
        SignUp,
        Login,
        Main,
        Eventos,
        Contatos,
        TesteNFC,
        EventoNav,
    },
    {
        initialRouteName: "Loading",
        defaultNavigationOptions: {
            title: 'Tutu Verde',
            headerStyle: {
                backgroundColor: '#2e8b57',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer teste="teste" />;
    }
}

class AppD extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        // TODO: You: Do firebase things
        // const { user } = await firebase.auth().signInAnonymously();
        // console.warn('User -> ', user.toJSON());
        // await firebase.analytics().logEvent('foo', { bar: '123'});
        console.log(SwitchNavigator)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.welcome}>
                        Welcome to {'\n'} React Native Firebase
          </Text>
                    <Text style={styles.instructions}>
                        To get started, edit App.js
          </Text>
                    {Platform.OS === 'ios' ? (
                        <Text style={styles.instructions}>
                            Press Cmd+R to reload,{'\n'}
                            Cmd+D or shake for dev menu
            </Text>
                    ) : (
                            <Text style={styles.instructions}>
                                Double tap R on your keyboard to reload,{'\n'}
                                Cmd+M or shake for dev menu
            </Text>
                        )}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
