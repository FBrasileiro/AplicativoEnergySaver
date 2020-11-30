import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, Dimensions, StyleSheet, Button, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../components/UI/Card'
import Colors from '../constants/Colors'
import login from '../store/actions/auth'
import api from "../api";
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message'
import * as MessageBox from '../functions/MessageBox'

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

    validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    postApiData = () => {
        if(this.state.username === '' ||
        this.state.name === '' ||
        this.state.email === '' ||
        this.state.password === '' ||
        this.state.passwordConfirm === '') {
            MessageBox.Aviso('Atenção','Voce deve preencher todos os campos')
            // alert("Voce deve preencher todos os campos")
            return
        }
        if(this.state.password !== this.state.passwordConfirm === ''){
            MessageBox.Aviso('Atenção','As senhas precisam ser iguais')
            return
        }
        if(this.state.password.length < 8){
            MessageBox.Aviso('Atenção','As senhas precisam ter no minimo 8 caracteres')
            return
        }
        if(!this.validate(this.state.email)) {
            MessageBox.Aviso('Atenção','O endereço de email precisa ser válido')
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
            MessageBox.Sucesso('Sucesso', 'Registro realizado com sucesso')
            AsyncStorage.multiSet([['token', data.data.token],
                                ['username', data.data.data.user.username],
                                ['id', data.data.data.user._id]]).then(()=>{
                                    this.props.navigation.navigate('Main');
                                })
        })
        .catch(err=>{
            MessageBox.Erro('Erro',JSON.parse(err.response.request._response).message)
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
            <FlashMessage position="top"/>
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