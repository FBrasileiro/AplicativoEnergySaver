import React, {Component} from 'react';
import {logout} from '../store/actions/auth'

import {View, Text, StyleSheet, Button, FlatList, ScrollView, Dimensions} from 'react-native';
import api from '../api'
import Card from '../components/UI/Card'
import RefreshButton from '../components/UI/RefreshButton'
import CardHeader from '../components/UI/CardHeader'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import GraficoLinhas from '../components/Graficos/GraficoLinhas'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.meses=['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        this.data=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.state = {
            n_mes:new Date().getMonth(),
            mensal:0,
            username:'',
            id:'',
            token:'',
            g_data:[],
            data: {},
        }
    }

    componentDidMount(){
        AsyncStorage.multiGet(['username', 'id', 'token'],).then(user_info=>{
            this.setState({username:user_info[0][1]})
            this.setState({id:user_info[1][1]})
            this.setState({token:user_info[2][1]})
            this.getApiData();
        }).catch(err=> console.log(err))
    }

    getApiData = () => {
        api.get('user/getUserData', {
            headers:{
                authorization:this.state.token
            },
            params:{
                username:this.state.username,
                user_id:this.state.id,
            }
        })
        .then(data=>{
            console.log(this.handleData(data.data.message))
        })
        .catch(err=>{
            console.log(JSON.parse(err.response.request._response).message)
        })
    }

    logoutHandler = () => {
        logout(this.props.navigation);
    }

    handleData = (data) => {
        var provisorio = [0,0,0,0,0,0,0,0,0,0,0,0]
        var aux = 0
        data.map(el=> {
            var teste = new Date(el.data.date)
            provisorio[teste.getMonth()] += el.data.consume
            this.data = provisorio
            console.log(this.data[teste.getMonth()])
        })
        this.setState({g_data:this.data})
        this.data.map(el=>aux+=el)
        this.setState({mensal:aux})
    }


    render(){
        return(
            <View style={{flex: 1}}>
            <LinearGradient colors={[Colors.bg2, Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
            <ScrollView contentContainerStyle={{
                justifyContent: 'flex-start',
                alignItems:'center',
            }}>

            <Card style={this.styles.container}>
            <RefreshButton onPress={this.getApiData}>Consumo Mensal</RefreshButton>
                <Text style={{fontSize:20, padding:10}}>{this.state.mensal} kW/h</Text>
            </Card>
            <Card style={{marginTop: 30}}>
                <CardHeader mes={this.meses[this.state.n_mes]} />
                <GraficoLinhas data={this.data}/>
            </Card>
            </ScrollView>
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
        },
        chartCard:{
            padding:20, 
            marginTop:'10%',
            maxWidth: Dimensions.get('window').width *0.8
        }
    })
}