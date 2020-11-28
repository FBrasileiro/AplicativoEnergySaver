import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'

export default class DataScreen extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View>
                <Text>Sync</Text>
            </View>
        );
    }
}