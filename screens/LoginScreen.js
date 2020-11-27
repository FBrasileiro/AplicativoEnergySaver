import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Keyboard, 
    KeyboardAvoidingView, StyleSheet, Button, Image, 
    TouchableWithoutFeedback
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../components/UI/Card'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

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
            console.log(user)
            if (user) {
              this.props.navigation.navigate('Main');
            }
          })
    }

    setEmail = (email) => {
        console.log(email)
        this.setState({email})
    }

    setPassword = (password) => {
        console.log(password)
        this.setState({password})
    }

    loginHandler = () =>{
        const pass = this.state.password;
        if(pass == '' || this.state.email == ''){
            alert("Por favor preencha os campos");
            return;
        }
        this.setState({password:''})
        authActions.login(this.state.email, pass, this.props).catch(err=> console.log(err));
    
    }

    log = () => {
        console.log(this.state.email);
        console.log(this.state.password);
    }
    
    render(){
        return(
            
            // <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} style={this.styles.screen}>
                <LinearGradient colors={[Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
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
                    <Button title="Switch to Sign Up" color={Colors.dyellow} onPress={()=>{}}/>
                </View>
                
            </Card>
            </LinearGradient>
            // </KeyboardAvoidingView>
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