import React, {Component} from 'react'
import { View, Text, StyleSheet, Button, FlatList, Dimensions, TouchableNativeFeedback, Clipboard, ToastAndroid } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../constants/Colors'
import {Octicons} from 'react-native-vector-icons'

import api from '../api'
import Card from '../components/UI/Card'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class DataScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            id:'',
            token:'',
            data:[]
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

    getApiData = () => {
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
            this.handleData(data.data)
        })
        .catch(err=>{
            console.log(JSON.parse(err.response.request._response).message)
        })
    }

    handleData = (data) => {
        this.setState({data:data.synced.devices})
        // console.log(this.state.data)
    }

    render(){
        return (
            <View style={{flex:1}}>
                <LinearGradient colors={[
                    Colors.bg2,
                    Colors.bg1,
                    Colors.bg2,
                    ]} style={this.styles.gradient}>
                        <View style={this.styles.container}>
                        <Button title="Sincronizar" onPress={()=>{this.getApiData()}}/>
                        <FlatList 
                            data={this.state.data}
                            keyExtractor={(item, index)=>`${item._id}`}
                            renderItem={(itemData) => 
                                <TouchableNativeFeedback 
                                onLongPress={async ()=>{
                                    await Clipboard.setString(itemData.item._id)
                                    ToastAndroid.show('Copied', ToastAndroid.SHORT); // mensagem pra falar que foi copiado
                                }}
                                useForeground
                                style={{borderRadius:15}}
                                >
                                <View key={itemData.item._id} style={{marginTop:10}}>
                                    <Card>
                                        <View style={{
                                            width: Dimensions.get('window').width * 0.6,
                                            height: 50,
                                            marginVertical: 5,
                                            paddingVertical: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Octicons size={20} color={itemData.item.color} name="circuit-board" style={{marginLeft: 20}}/>
                                            <Text style={{fontSize:20, marginLeft:10}}>{itemData.item.name}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent:'flex-end',
                                        }}>
                                            <Text style={{fontSize:10, marginRight:10, marginBottom:10}}>ID: {itemData.item._id}</Text>
                                        </View>
                                    </Card>
                                </View>
                                </TouchableNativeFeedback>
                            }
                        />
                        </View>
                </LinearGradient>
            </View>
        );
    }

    styles = StyleSheet.create({
        container:{
            width:'80%',
            maxWidth: 400,
            padding: 20,
            height:'80%',
            maxHeight: Dimensions.get('screen').height * 0.9,
            justifyContent: 'center',
            alignItems:'center',
            marginTop:'20%',
            // borderColor:'#ccc',
            // borderWidth:1,
            // borderRadius:80,
            // backgroundColor:Colors.bg1
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