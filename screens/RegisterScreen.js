import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Dimensions, StyleSheet, Button, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../components/UI/Card'
import Colors from '../constants/Colors'
import login from '../store/actions/auth'
import api from "../api";

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            name:"",
            email:"",
            password:"",
            passwordConfirm:""

        }
    }

    postApiData = () => {
        if(this.state.username === '' ||
        this.state.name === '' ||
        this.state.email === '' ||
        this.state.password === '' ||
        this.state.passwordConfirm === '') {
            alert("Voce deve preencher todos os campos")
            return
        }

        api.post('auth/signup',JSON.stringify({
            username:this.state.username,
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            passwordConfirm:this.state.passwordConfirm,
        }))
        .then(data => {
            AsyncStorage.multiSet([['token', data.data.token],
                                ['username', data.data.data.user.username],
                                ['id', data.data.data.user._id]]).then(()=>{
                                    this.props.navigation.navigate('Main');
                                })
        })
        .catch(err=>{
            console.log(JSON.parse(err.response.request._response).message)
        })
    }

    setUsername = (username) => { this.setState({username}) }
    setName = (name) => { this.setState({name}) }
    setEmail = (email) => { this.setState({email}) }
    setPassword = (password) => { this.setState({password}) }
    setPasswordConfirm = (passwordConfirm) => { this.setState({passwordConfirm}) }

    

    render(){
        return(
            <LinearGradient colors={[Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
                <KeyboardAvoidingView>
            <Card style={this.styles.authContainer}>
                <ScrollView style={{maxHeight:Dimensions.get('window').height}}>
                <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>Username</Text>
                    <TextInput keyboardType='email-address' 
                    required email autoCapitalize="none"
                    onChangeText={this.setUsername}
                    initialValue={this.state.username} style={this.styles.input}/>
                </View>
                <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>Nome</Text>
                    <TextInput keyboardType='email-address' 
                    required email autoCapitalize="none"
                    onChangeText={this.setName}
                    initialValue={this.state.name} style={this.styles.input}/>
                </View>
                <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>E-Mail</Text>
                    <TextInput keyboardType='email-address' 
                    required email autoCapitalize="none"
                    onChangeText={this.setEmail}
                    initialValue={this.state.email} style={this.styles.input}/>
                </View>

                <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>Senha</Text>
                    <TextInput keyboardType='default'  
                    secureTextEntry required autoCapitalize="none"
                    onChangeText={this.setPassword}
                    value={this.state.password} style={this.styles.input}/>
                </View>
                <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>Confirmar Senha</Text>
                    <TextInput keyboardType='default'  
                    secureTextEntry required autoCapitalize="none"
                    onChangeText={this.setPasswordConfirm}
                    value={this.state.passwordConfirm} style={this.styles.input}/>
                </View>
                </ScrollView>
                <View style={this.styles.buttonContainer}>
                    <Button title="Registrar" color={Colors.dblue} onPress={this.postApiData}/>
                </View>
            </Card>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }

    styles = StyleSheet.create({
        screen:{
            flex:1,
            
        },
        authContainer:{
            width:Dimensions.get('window').width * 0.9,
            maxWidth: 400,
            padding: 20,
            maxHeight: 600,
            height:Dimensions.get('window').height * 0.5

        },
        gradient:{
            flex:1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems:'center',
        },
        buttonContainer:{
            marginTop: 10,
        },
        formControl: {
            marginVertical: 8,
            width: '100%'
        },
          label: {
            // fontFamily: 'open-sans-bold',
            marginVertical: 8
          },
          input: {
            paddingHorizontal: 2,
            paddingVertical: 5,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1
          }
    })

}