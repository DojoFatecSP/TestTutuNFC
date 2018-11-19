// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import firebase from 'react-native-firebase';

export default class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            //console.log(user)
            this.props.navigation.navigate(user ? 'Main' : 'SignUp', {user})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Carregando</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})