import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Keyboard, KeyboardAvoidingView, StyleSheet, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../components/UI/Card'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

export default class LoginScreen extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} style={this.styles.screen}>
                <LinearGradient colors={[Colors.bg1, Colors.bg2]} style={this.styles.gradient}>
            <Card style={this.styles.authContainer}>
                <ScrollView>
                <Input id="name" label="Name" keyboardType='email-address' 
                    required email autoCapitalize="none" errorMessage="Por favor coloque um email valido"
                    onInputChange={()=>{}}
                    initialValue=""/>
                    <Input id="email" label="E-Mail" keyboardType='email-address' 
                    required email autoCapitalize="none" errorMessage="Por favor coloque um email valido"
                    onInputChange={()=>{}}
                    initialValue=""/>
                    <Input id="password" label="Password" keyboardType='default' 
                    secureTextEntry required minLength={8} autoCapitalize="none" errorMessage="Por favor coloque uma senha valida"
                    onInputChange={()=>{}}
                    initialValue=""/>
                    <Input id="password" label="Confitm Password" keyboardType='default' 
                    secureTextEntry required minLength={8} autoCapitalize="none" errorMessage="Por favor coloque uma senha valida"
                    onInputChange={()=>{}}
                    initialValue=""/>
                </ScrollView>
                <View style={this.styles.buttonContainer}>
                    <Button title="Login" color={Colors.dblue} onPress={()=>{}}/>
                </View>
                <View style={this.styles.buttonContainer}>
                    <Button title="Switch to Sign Up" color={Colors.dyellow} onPress={()=>{}}/>
                </View>
                
            </Card>
            </LinearGradient>
            </KeyboardAvoidingView>
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
            maxHeight: 700

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
        }
    })

}