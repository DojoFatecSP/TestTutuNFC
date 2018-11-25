import React, { Component } from 'react'
import { StyleSheet, Platform, Text, View, ScrollView} from 'react-native'
import {Card, Button} from 'react-native-elements'

const EventCard = props => {
    
    return (
        <Card
            //title={props.event.name}
            image={{uri: props.event.cardPhoto}}>
            <Text style={{ marginBottom: 10, fontWeight:'bold' }}>
                {props.event.name}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                {props.event.description}
            </Text>
            <Button
                backgroundColor='#03A9F4'
                onPress={() => props.nav('EventoNav', {event: props.event})}
                title='Detalhes' />
        </Card>
    )
}


export default class Eventos extends Component {
    render() {
        const userEventsData = this.props.navigation.getParam('userEventsData', [{ name: 'erro ao carregar eventos!' }])
        return (
            <ScrollView>
                {userEventsData.map(event => <EventCard key={event.name} event={event} nav={this.props.navigation.navigate}/>)}
            </ScrollView>
        )
    }
}