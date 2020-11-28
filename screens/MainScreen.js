import React, {Component, useState, useEffect} from 'react';
import {logout} from '../store/actions/auth'

import {View, Text, StyleSheet, Button, FlatList, ScrollView} from 'react-native';
import api from '../api'
import Card from '../components/UI/Card'
import CardHeader from '../components/UI/CardHeader'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import GraficoLinhas from '../components/Graficos/GraficoLinhas'

export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_info:{},
            data: {},
        }
    }

    componentDidMount(){
        
    }

    
    logoutHandler = () => {
        logout(this.props.navigation);
    }

    

    render(){
        return(
            <View style={{flex: 1}}>
            <LinearGradient colors={[Colors.bg2, Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
            
            <Card style={this.styles.container}>
                <Text style={{fontSize:20, padding:10}}>Você Consumiu</Text>
                <Text style={{fontSize:20, padding:10}}>0 kW/h</Text>
            </Card>
            <Card style={{padding:20, marginTop:'10%'}}>
                <GraficoLinhas />
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