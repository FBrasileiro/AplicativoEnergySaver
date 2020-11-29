import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, TouchableNativeFeedback} from 'react-native';
import api from '../api'
import {logout} from '../store/actions/auth'
import Card from '../components/UI/Card'
import CardHeader from '../components/UI/CardHeader'
import RefreshButton from '../components/UI/RefreshButton'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import GraficoLinhas from '../components/Graficos/GraficoLinhas'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.data=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.state = {
            anual:0,
            username:'',
            id:'',
            token:'',
            g_data:[],
            data: {},
        }
    }

    componentDidMount(){

        AsyncStorage.multiGet(['username', 'id', 'token'],).then(user_info=>{
            // console.log(user_info)
            this.setState({username:user_info[0][1]})
            this.setState({id:user_info[1][1]})
            this.setState({token:user_info[2][1]})
            this.getApiData();
        }).catch(err=> console.log(err))
    }
    logoutHandler = () => {
        logout(this.props.navigation);
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
            if(JSON.parse(err.response.request._response).message){
                if(JSON.parse(err.response.request._response).message === "The user does no longer exists") this.logoutHandler()
            }
            
        })
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
        this.setState({anual:aux})
    }

    chartHandle = () =>{
        this.props.navigation.navigate('Chart')
    }

    render(){
        return(
            <View style={{flex: 1}}>
            <LinearGradient colors={[Colors.bg2, Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
            
            <Card style={this.styles.container}>
            <RefreshButton onPress={this.getApiData}>Consumo Anual</RefreshButton>
                <Text style={{fontSize:20, padding:10}}>{this.state.anual} kW/h</Text>
            </Card>
            <Card style={{marginTop:'10%', borderColor:'#ccc', borderWidth:1}}>
                <CardHeader 
                mes={2020}
                width={Dimensions.get('screen').width * 0.9}
                maxWidth={Dimensions.get('screen').width * 0.9}
                color_left="gray"
                colorR="gray"
                />
                <View style={{alignItems:'center'}}>
                    <GraficoLinhas data={this.data} label={['J','F','M','A','M','J','J','A','S','O','N','D']}/>
                </View>
                <TouchableNativeFeedback onPress={this.chartHandle}>
                    <View style={{
                        backgroundColor:Colors.bg1, 
                        alignItems:'center',
                        padding:6,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                        }}>
                        <Text style={{fontSize:18}}>Detalhes</Text>
                    </View>
                </TouchableNativeFeedback>
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