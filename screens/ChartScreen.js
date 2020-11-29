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
import GraficoPizza from '../components/Graficos/GraficoPizza'
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
            data: [],
            chart_data_n:[],
            chart_data: []
        }
    }

    componentDidMount(){
        AsyncStorage.multiGet(['username', 'id', 'token'],).then(user_info=>{
            this.setState({username:user_info[0][1]})
            this.setState({id:user_info[1][1]})
            this.setState({token:user_info[2][1]})
            this.getApiData();
            this.getChartData();
        }).catch(err=> console.log(err))
    }

    refreshHandle = () => {
        this.getApiData();
        this.setState({chart_data:[]})
        this.getChartData();
        console.log(this.state.chart_data)
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
            this.handleData(data.data.message)
        })
        .catch(err=>{
            console.log(JSON.parse(err.response.request._response).message)
        })
    }

    handleData = (data) => {
        this.setState({data})
        var aux = [0,0,0,0,0,0,0,0,0,0,0,0]
        data.map(el=> {
            var mes = new Date(el.data.date).getMonth()
            aux[mes] += el.data.consume
            this.data = aux
            // console.log(this.data[mes])
        })
        this.setState({g_data:this.data})
        this.setState({mensal:this.data[this.state.n_mes]})
    }

    getChartData = () => {
        api.get('user/getUserSyncedDevices', {
            headers:{
                authorization:this.state.token
            },
            params:{
                username:this.state.username,
                user_id:this.state.id,
            }
        })
        .then(data=>{
            this.setState({chart_data_n: data.data.synced.devices})
            this.handleChartData()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChartData = (m_mes) => {
        if(!m_mes) m_mes=this.state.n_mes
        var ids=[]
        this.state.chart_data_n.map((el)=>{
            ids.push(el._id)
        })
        ids.map(id=>{
            api.get('user/getSyncedDeviceData', {
                headers:{authorization:this.state.token},
                params:{
                    user_id:this.state.id,
                    username:this.state.username,
                    device_id:id
                }
            })
            .then(data=>{
                var valor = 0
                data.data.synced.data.map(el=>{
                    if(this.state.n_mes == new Date(el.data.date).getMonth()){
                        valor+=el.data.consume
                    }
                })
                if(this.state.n_mes == new Date(data.data.synced.data[0].data.date).getMonth())
                this.createChart(data.data.synced.data[0].device_name, valor, data.data.synced.data[0].device_color)
            }).catch(err=>{})
        })
    }

    createChart = (name, population, color) => {
        // console.log(name, population, color)
        var data = {
            name,
            population,
            color,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        }
        if(!this.state.chart_data)
            this.setState({chart_data:[data]})
        else
            this.setState({chart_data:[...this.state.chart_data, data]})
        // console.log(this.state.chart_data)
    }


    handleNextBack = (dir) => {
        var aux = this.state.n_mes;
        if((this.state.n_mes === 11 && dir === 1) ||
            this.state.n_mes === 0 && dir === -1 ||
            this.state.n_mes === new Date().getMonth() && dir === 1) return
        // Nao deixa que passe caso tente ir para um mes maior q o atual
        // ou menor que janeiro
        this.setState({n_mes:aux+dir})
        this.setState({mensal:this.state.g_data[aux+dir]})
        this.setState({chart_data:[]})
        this.getChartData();
        console.log(this.state.chart_data)

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
            <RefreshButton onPress={this.refreshHandle}>Consumo Mensal</RefreshButton>
                <Text style={{fontSize:20, padding:10}}>{this.state.mensal} kW/h</Text>
            </Card>
            <Card style={{marginTop: 30}}>
                <CardHeader mes={this.meses[this.state.n_mes]}
                    onPressL={()=>this.handleNextBack(-1)}
                    onPressR={()=>this.handleNextBack(1)}
                    color_left={this.state.n_mes === 0 ? "gray" : "black"}
                    colorR={
                        this.state.n_mes !== new Date().getMonth() ?
                        this.state.n_mes === 11 ? "gray" : "black" : "gray"}
                    />
                {this.state.chart_data.length != 0 ? <GraficoPizza
                    data={this.state.chart_data}
                /> :
                <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
                    <Text>Sem dados disponiveis</Text>
                </View>
                 }
                
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