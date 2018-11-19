import React, { Component } from 'react'
import { StyleSheet, Platform, Text, View, Button } from 'react-native'

export default class Eventos extends Component {
    render() {
        const userEventsData = this.props.navigation.getParam('userEventsData', [{name:'erro ao carregar eventos!'}])
        return (
            <View>
                {console.log(userEventsData)}
                {userEventsData.map(event => <Text key={event.name}>{event.name}</Text>)}
            </View>
        )
    }
}