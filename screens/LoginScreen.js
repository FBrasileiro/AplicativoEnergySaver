import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Keyboard, 
    KeyboardAvoidingView, StyleSheet, Button, Image, 
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../components/UI/Card'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'
import FlashMessage from 'react-native-flash-message'
import * as MessageBox from '../functions/MessageBox'

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('token').then(user => {
            if (user) {
              this.props.navigation.navigate('Main');
            }
          })
    }

    setEmail = (email) => {
        this.setState({email})
    }

    setPassword = (password) => {
        this.setState({password})
    }

    loginHandler = () =>{
        const pass = this.state.password;
        if(pass == '' || this.state.email == ''){
            MessageBox.Aviso('Atenção', 'Os campos devem ser preenchidos')
            return;
        }
        this.setState({password:''})
        authActions.login(this.state.email, pass, this.props)
        .catch(err=> MessageBox.Erro('Erro', err.message));
    
    }

    
    render(){
        return(
            
            // <KeyboardAvoidingView>
                <LinearGradient colors={[Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
                <FlashMessage position="top"/>
            <Image style={{width: 70, height: 70, padding:70, marginTop: -100, marginBottom:50}} // icone: https://www.jing.fm/iclipt/obJiTi/
            source={require('../assets/Icone.png')}/>
            <Card style={this.styles.authContainer}>
                <ScrollView>
                    <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>E-Mail</Text>
                    <TextInput keyboardType='email-address' 
                    required email autoCapitalize="none"
                    onChangeText={this.setEmail}
                    initialValue={this.state.email} style={this.styles.input}/>
                    </View>

                    <View style={this.styles.formControl}>
                    <Text style={this.styles.label}>Password</Text>
                    <TextInput keyboardType='default'  
                    secureTextEntry required autoCapitalize="none"
                    onChangeText={this.setPassword}
                    value={this.state.password} style={this.styles.input}/>
                    </View>
                </ScrollView>
                <View style={this.styles.buttonContainer}>
                    <Button title="Login" color={Colors.dblue} onPress={()=>{this.loginHandler()}}/>
                </View>
                <View style={this.styles.buttonContainer}>
                    <Button title="Registrar" color={Colors.dyellow} onPress={()=>{this.props.navigation.navigate('Register')}}/>
                </View>
                
            </Card>
            </LinearGradient>
            //</KeyboardAvoidingView>
        );
    }

    styles = StyleSheet.create({
        screen:{
            flex:1,
            // justifyContent: 'center',
            // alignItems:'center',
        },
        authContainer:{
            width:'80%',
            maxWidth: 400,
            padding: 20,
            maxHeight: 400,

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