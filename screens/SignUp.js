// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase';


export default class SignUp extends React.Component {
    static navigationOptions = {
        headerLeft: null
    }

    state = { nome: '', email: '', password: '', errorMessage: null }

    handleSignUp = () => {
        // TODO: Firebase stuff...
        const { nome, email, password } = this.state
        const valid = true; // TODO: valided email e password
        if (valid) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(result => {
                    
                    firebase.firestore().collection('users').doc(result.user.uid).set({
                        events:[],
                        nome
                    })

                })
                .catch(err => console.warn(err))
        }
        console.log('handleSignUp')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cadastre-se</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Nome Completo"
                    style={styles.textInput}
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                    autoCapitalize="words"
                />

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Senha"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button
                    title="Cadastre-se"
                    onPress={this.handleSignUp} />
                <Button
                    title="Já possui uma conta? Faça Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
})