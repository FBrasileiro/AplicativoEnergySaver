import React, {Component} from 'react'
import { View, Text, StyleSheet, Button, TouchableNativeFeedback, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import {logout} from '../store/actions/auth'
import Card from '../components/UI/Card'
import api from '../api'

export default class DataScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            id:'',
            token:'',
            name:'',
            email:'',

        }
    }

    logoutHandler = () => {
        logout(this.props.navigation);
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

    getApiData = () => {
        console.log(this.state.token)
        api.get('user/getUserInfo', {
            headers:{
                authorization: this.state.token
            },
            params:{
                user_id:this.state.id,
                username:this.state.username,
            }
        }).then(data=>{
            this.setState({name:data.data.user.name})
            this.setState({email:data.data.user.email})
            console.log(data.data)
        }).catch(err=>{
            console.log(err)
        })
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
                            <View style={{alignContent:'flex-start', maxWidth:Dimensions.get('window').width*0.8}}>
                                <TouchableNativeFeedback onPress={()=>{this.logoutHandler()}}>
                                    <View style={this.styles.logoutBtn}>
                                        <Text>Deslogar</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <View style={this.styles.infoContainer}>
                                        <Text style={{padding:5, fontSize:18}}>Nome: </Text>
                                        <Text style={{padding:5, fontSize:13}}>{this.state.name}</Text>
                                </View>
                                <View style={this.styles.infoContainer}>
                                        <Text style={{padding:5, fontSize:18}}>Usuário: </Text>
                                        <Text style={{padding:5, fontSize:13}}>{this.state.username}</Text>
                                </View>
                                <View style={this.styles.infoContainer}>
                                        <Text style={{padding:5, fontSize:18}}>Email: </Text>
                                        <Text style={{padding:5, fontSize:13}}>{this.state.email}</Text>
                                </View>
                                <View style={this.styles.infoContainer}>
                                        <Text style={{padding:5, fontSize:18}}>ID: </Text>
                                        <Text style={{padding:5, fontSize:13}}>{this.state.id}</Text>
                                </View>
                                <TouchableNativeFeedback onPress={()=>{console.log("Apertou")}}>
                                    <View style={{
                                            alignItems:'center', 
                                            padding:15,
                                            width:Dimensions.get('window').width * 0.8,
                                            borderBottomEndRadius:10,
                                            borderBottomStartRadius:10,
                                            backgroundColor:Colors.bg1
                                        }}>
                                        <Text>Mudar Informações</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>

                            
                        </Card>
                </LinearGradient>
            </View>
        );
    }

    styles = StyleSheet.create({
        container:{
            paddingBottom:0,
            width:'80%',
            maxWidth: 400,
            padding: 20,
            maxHeight: 400,
            justifyContent: 'center',
            alignItems:'center',
            marginTop:'20%',
        },
        gradient:{
            paddingVertical:"20%",
            flex:2,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems:'center',
        },
        infoContainer:{
            paddingHorizontal:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderColor:'#ccc',
            borderBottomWidth:1,
            marginBottom:10
        },
        logoutBtn:{ 
            padding:10,
            backgroundColor:'rgba(255,0,0,0.75)',
            height:40,
            justifyContent:'center',
            alignItems:'center',
            width: 100,
            marginLeft:"70%",
            paddingRight:10,
            borderRadius:10,
            marginBottom:15,
        }
    })
}