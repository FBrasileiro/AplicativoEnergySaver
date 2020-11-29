import React, {Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import {logout} from '../store/actions/auth'
import Card from '../components/UI/Card'

export default class DataScreen extends Component{
    constructor(props){
        super(props)
    }

    logoutHandler = () => {
        logout(this.props.navigation);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <LinearGradient colors={[
                    Colors.bg2,
                    Colors.bg1,
                    Colors.bg2,
                    ]} style={this.styles.gradient}>
                        <Card style={this.styles.container}>
                            <Text>Perfil</Text>
                            <Button title="Deslogar" onPress={this.logoutHandler}/>
                        </Card>

                </LinearGradient>
            </View>
        );
    }

    styles = StyleSheet.create({
        container:{
            width:'80%',
            maxWidth: 400,
            padding: 20,
            maxHeight: 400,
            justifyContent: 'center',
            alignItems:'center',
            marginTop:'20%',
        },
        gradient:{
            flex:1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems:'center',
        },
    })
}