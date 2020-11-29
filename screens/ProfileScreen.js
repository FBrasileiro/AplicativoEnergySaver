import React, {Component} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
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
            nome:'',

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
        api.get('user/getUserInfo', {
            header:{authorization:this.state.token},
            params:{
                username:this.state.username,
                user_id:this.state.id,
            }
        }).then(data=>{
            console.log(data)
        }).catch(err=>console.log(err))
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
                            <Text>{this.state.username}</Text>
                            <Text>{this.state.id}</Text>
                            <Text>{}</Text>
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